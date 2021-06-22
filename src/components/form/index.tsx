import './styles/index';
import Form from './form';
import Item from './item';

const ComposedForm = Form as typeof Form & {
  Item: typeof Item;
};

ComposedForm.Item = Item;

export default ComposedForm;
