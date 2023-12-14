import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FaPlus } from "react-icons/fa";
import { collection, onSnapshot } from "firebase/firestore";
import ToDoTaskCards from "./components/ToDoTaskCards";
import useDisclouse from "./hooks/useDisclouse";
import { db } from "./config/FirebaseConfig";
import NoToDoTaskFound from "./components/NoToDoTaskFound";
import AddandUpdateTask from "./components/AddandUpdateTask";
import { ToastContainer } from "react-toastify";

function App() {
  const [task, SetTask] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getTask = async () => {
      const taskRef = collection(db, "todotasks");
      onSnapshot(taskRef, (snapshot) => {
        const taskLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        SetTask(taskLists);
        console.log(taskLists);
        return taskLists;
      });
    };
    getTask();
  }, []);
  return (
    <>
      <div className="mx-auto rounded-lg wrapper">
        <div className="top">
        <AddandUpdateTask isOpen={isOpen} onClose={onClose} />
          <Navbar />

          <div className="flex gap-2 justify-center">
            <div className="relative flex items-center">
              <button
                className="task-btn flex justify-between gap-2"
                onClick={onOpen}
              >
                Create a new task <FaPlus onClick={onOpen} />
              </button>
            </div>
          </div>
        </div>

        <div className="wrapper2">
          <div className="card-wrapper">
            {task.length <= 0 ? (
              <NoToDoTaskFound />
            ) : (
              task.map((tasks,index) => (
                <ToDoTaskCards key={task.key} tasks={tasks} index={index} />
              ))
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"/>
       
       
    </>
  );
}

export default App;
