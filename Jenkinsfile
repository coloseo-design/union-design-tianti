node('node-dev') {
    try {
        currentBuild.result = "SUCCESS"
        env.IMAGE_REPO = "${TencentyunColoseoRepo}"
        env.IMAGE_NAME = "${PROJECT}"
        env.IMAGE_TAG = "${env.BUILD_NUMBER}-${DEPLOY_ENV}"
        env.NAMESPACE = "union-stage"
        env.deploy_auth = "f9f5fb41-b3aa-4f12-a42a-3c7c64f33e7e"

        stage('Git') {
            checkout([$class: 'GitSCM', branches: [[name: 'develop']],
                 userRemoteConfigs: [[credentialsId: 'gitlabAuth', url: '${GITLAB}/${GROUP}/${PROJECT}.git']]])
        }

        stage('Install npm module') {
            container("node10") {
                sh "npm ci"
            }
        }

        stage('Build app') {
          container("node10") {
            sh "npm run build"
          }
        }

        stage('Build docker image') {
            container("dind") {
                dockerImage = "${env.IMAGE_REPO}/${env.IMAGE_NAME}:${env.IMAGE_TAG}"
                docker.withRegistry("https://${env.IMAGE_REPO}", 'tencentyun_registry_auth') {
                    def customImage = docker.build("${dockerImage}", "--network host .")
                    /* Push the container to the custom Registry */
                    customImage.push()
                }
            }
        }

        stage('Deploy to kubernetes') {
            container('helm3') {
                withKubeConfig([credentialsId: "${env.deploy_auth}"])
                {
                    /* Deploy image variables. */
                    env.deploy_image = "--set image.repository=${env.IMAGE_REPO}/${env.IMAGE_NAME} --set image.tag=${env.IMAGE_TAG}"
                    env.deploy_option = "-f deployment-${DEPLOY_ENV}.yaml --namespace ${env.NAMESPACE} --set application.env=${DEPLOY_ENV}"

                    sh "helm upgrade -i ${PROJECT}-${DEPLOY_ENV} deploy ${env.deploy_option} ${env.deploy_image}"
                }
            }
        }

        stage('Slack notifaction') {
            slackSend color: 'good', message: "${JOB_NAME} build: ${currentBuild.result}"
        }
    }
    catch (err) {
        currentBuild.result = "FAILURE"
        slackSend color: 'danger', message: "${JOB_NAME} build failure is here: ${env.BUILD_URL}"
        throw err
    }
}
