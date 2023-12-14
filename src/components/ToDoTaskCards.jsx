import React from 'react'
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import useDisclouse from '../hooks/useDisclouse';
import { toast } from "react-toastify";
import AddandUpdateTask from './AddandUpdateTask';
import "react-toastify/dist/ReactToastify.css";

const ToDoTaskCards = ({ tasks, index }) => {

    const { isOpen, onOpen, onClose } = useDisclouse();

    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "todotasks", id));
            toast.success("Task Deleted Successfully");
        } catch (error) {
            console.log(error);
            toast.success("Task Not Deleted Successfully");
        }
    }

    const colors = [
        {
            primaryColor: "rgb(77, 226, 72)",
            secondaryColor: "rgba(77, 226, 72, 0.315)"
        },
        {
            primaryColor: "rgb(255, 210, 60)",
            secondaryColor: "rgba(255, 209, 60, 0.619)"
        },
        {
            primaryColor: "#5D93E1",
            secondaryColor: "rgba(58, 104, 255, 0.301)"
        },
        {
            primaryColor: "rgb(255, 57, 57)",
            secondaryColor: "rgba(255, 57, 57, 0.424)"
        },
        {
            primaryColor: "rgb(135, 60, 255)",
            secondaryColor: "rgb(135, 60, 255, 0.424)"
        },
        {
            primaryColor: "rgb(255, 85, 43)",
            secondaryColor: "rgb(255, 85, 43, 0.424)"
        }
    ]

    return (
        <>
            <div className="card-ver" style={{ "border-bottom": `4px solid ${colors[index % 6].primaryColor}` }}>
                <div key={tasks.id} className=' flex items-center justify-around rounded-lg p-2 name' style={{ "background": colors[index % 6].secondaryColor }}  >
                    <div className='flex gap-1'  >
                        <div>
                            <h2 className='font-medium task-title'>{tasks.taskName}</h2>
                            <p >{tasks.taskDescription}</p>
                        </div>
                    </div>





                    <div className='text-2xl flex justify-end m-auto' >
                        <RiEditCircleLine className='cursor-pointer mt-20' style={{ "color": colors[index % 6].primaryColor }} onClick={onOpen} />
                        <IoMdTrash className='text-orange cursor-pointer mt-20' style={{ "color": colors[index % 6].primaryColor }} onClick={() => deleteContact(tasks.id)} />
                    </div>
                </div>
            </div>






            <AddandUpdateTask isOpen={isOpen} onClose={onClose} isUpdate tasks={tasks} />
        </>
    )
}

export default ToDoTaskCards
