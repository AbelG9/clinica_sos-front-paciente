import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';

const ModalSave = ({ modal, toggle, saveReport, onChange }) => {
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Añadir informe diario</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Input type="file" name="file" onChange={onChange} />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
            <Button outline color="secondary" onClick={toggle}>Cancelar</Button>
            <Button color="primary" onClick={saveReport}>Guardar</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalSave;