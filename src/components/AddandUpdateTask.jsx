import React from 'react'
import * as Yup from "yup";
import Modal from './Modal';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import { toast } from 'react-toastify';
import "../index.css"

const contatSchemaValidation = Yup.object().shape(
    {
        taskName: Yup.string().required("Task Name is Required"),
        taskDescription: Yup.string().required("Task Description is Required")
    }
)




const AddandUpdateTask = ({ isOpen, onClose, isUpdate, tasks }) => {

    const addContact = async (tasks) => {
        try {
            const taskRef = collection(db, "todotasks");
            await addDoc(taskRef, tasks);
            onClose();
            toast.success("Task Added Successfully");

        } catch (error) {
            console.log(error);
            toast.error("Task Cannot Be Added");
        }
    }

    const updateContact = async (tasks, id) => {
        try {
            const taskRef = doc(db, "todotasks", id);
            await updateDoc(taskRef, tasks);
            onClose();
            toast.success("Task Updated Successfully");

        } catch (error) {
            console.log(error);
            toast.error("Task Cannot Be Updated");
        }
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3 className='text-center text-xl'>{isUpdate ? "update " : "Create "} Your ToDo</h3>
            <Formik
                validationSchema={contatSchemaValidation}
                initialValues={
                    isUpdate ?
                        {
                            taskName: tasks.taskName,
                            taskDescription: tasks.taskDescription
                        } :
                        {
                            taskName: "",
                            taskDescription: ""
                        }
                }

                onSubmit={(values) => {
                    // console.log(values);

                    isUpdate ?
                        updateContact(values, tasks.id) :
                        addContact(values);

                }}
            >
                <Form>
                    <div className='flex items-center p-4 gap-2 flex-col'>
                        <div className='my-1 flex flex-col'>
                            <label>Task Name:</label>
                            <Field name="taskName" className='border border-orange  px-6 py-1 rounded-sm input-field'></Field>
                            <div className='text-red-600 text-xs my-1' >
                                <ErrorMessage name="taskName" />
                            </div>
                        </div>

                        <div className='my-1 flex flex-col'>
                            <label>Description</label>
                            <Field name="taskDescription" className='border border-orange  px-6 py-1 rounded-sm input-field'></Field>
                            <div className='text-red-600 text-xs my-1' >
                                <ErrorMessage name="taskDescription" />
                            </div>
                        </div>

                        <div className='flex gap-2 btndiv'>
                            <div className='flex items-center my-2 justify-center text-center'>
                                <button type='submit' className='submit-btn'>{isUpdate ? "Update" : "Add"} Task</button>
                            </div>

                            <div className='flex  items-center my-2 justify-center text-center'>
                                <button onClick={onClose} className='submit-btn'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </Modal>
    )
}

export default AddandUpdateTask
