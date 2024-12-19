import { useState } from "react";
import "./PostUser.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const PostUser =() =>{

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department:""
    })

    const handleInputChange = (event) =>{
        const {name,value} = event.target;
        setFormData({
            ...formData,[name]:value,
        })
    }
   

    const navigate = useNavigate();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();

        console.log(formData);
        try{

            const response = await fetch("http://localhost:8080/api/employee",{

                method : "post",
                headers :{"Content-Type":"application/json"},
                body:JSON.stringify(formData)
            })    

            const data = await response.json();
            console.log("employee added: ", data);
            navigate("/")    
  
        }catch (error){
            console.log("error creating employee:", error.message);

        }
    }
    const [tableData, setTableData] =useState([])
    const [editClick, setEditClick] =useState(false);
    const [editIndex, setEditIndex] =useState(" ");
 const addData =(e) =>{
    e.preventDefault();
    //console.log("inputs",formData)
    if(editClick){
        const tempTableData = tableData;
        Object.assign(tempTableData[editIndex],formData)
        setTableData([...tempTableData])
        setEditClick(false);
        setFormData({
            name: "",
            email: "",
            phone: "",
            department:""
        })

    }else{
        setTableData([...tableData,formData])
        setFormData({
            name: "",
            email: "",
            phone: "",
            department:""
        })
    }
    
 };
 const handleDelete=(index)=>{
    const filterData=tableData.filter((formData,i)=>i!==index)
    setTableData(filterData);
 }
 const handleEdit=(index)=>{
    const tempData=tableData[index]
    setFormData(
        {
            name:tempData.name,
            email:tempData.email,
            phone:tempData.phone,
            department:tempData.department

        }
      
    )
    setEditClick(true);
    setEditIndex(index);

 }

    return(
        <>
           <div className="center-form">
            <h1>Post New Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                   
                    <Form.Control type='text' name="name"
                     placeholder="Enter Name" value={formData.name}
                     onChange={handleInputChange} />

                </Form.Group>

                <Form.Group controlId="formBasicName">
                   
                   <Form.Control type='email' name="email"
                    placeholder="Enter EmailId" value={formData.email}
                    onChange={handleInputChange} />

               </Form.Group>
                    
               <Form.Group controlId="formBasicName">
                   
                   <Form.Control type='text' name="phone"
                    placeholder="Enter PhoneNo" value={formData.phone}
                    onChange={handleInputChange} />

               </Form.Group>

               <Form.Group controlId="formBasicName">
                   
                   <Form.Control type='text' name="department"
                    placeholder="Enter department" value={formData.department}
                    onChange={handleInputChange} />
 
               </Form.Group>

                <Button varient ="primary" type="button" className="w-100" onClick={addData}> {editClick ? "Update" :"Add"} </Button>
                
                <div className="center-form2">
                    <table className="w-100 text-center" >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>EmailId</th>
                                <th>PhoneNo</th>
                                <th>Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                       <tbody className="text-black">
                        {
                            tableData.map((formData,i)=>(
                                <tr>
                                    <td> {formData.name} </td>
                                    <td> {formData.email} </td>
                                    <td> {formData.phone} </td>
                                    <td> {formData.department} </td>
                                    <td> 
                                        <Button className="mr-3 text-yellow-300" 
                                            style={{backgroundColor:'skyblue',color:'white'}} onClick={()=>handleEdit(i)} >Edit</Button>
                                        <Button className="text-red-500" 
                                            style={{backgroundColor:'red',color:'white'}} onClick={()=>handleDelete(i)}>Delete</Button>
                                    </td>

                                </tr>
                            ))

                              
                        }
                       
                       </tbody>
                           

                    </table>



                </div>



                 <Button varient ="primary" type="submit" className="w-100">Add Employee</Button>

                

            </Form>
          

           </div>

        </>

    )
}

export default PostUser;