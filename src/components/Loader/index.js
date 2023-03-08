import ReactDom from 'react-dom';
import { Overlay } from './styles';

function Loader() {
  return ReactDom.createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>,
    document.getElementById('loader-root'),
  );
}

export default Loader;
