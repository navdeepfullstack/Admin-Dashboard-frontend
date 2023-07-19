import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {

  console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Dish Description
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Details</h5>
        <p>
    {
      props?.data?.des
    }
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;