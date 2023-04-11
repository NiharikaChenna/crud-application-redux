import { useController, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addContact, editContact } from "../Redux/Action";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  number: yup
    .string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
});

const Contacts = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const contacts = useSelector((state) => state);
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  const contactToEdit = currentContact ? true : false;

  // const nameController = useController({
  //   name: "name",
  //   control,
  //   defaultValue: name,
  //   rules: { required: "Name is required" },
  // });

  const name = useController({
    name: "name",
    control,
    rules: {
      required: "Name is required",
    },
    defaultValue: currentContact ? currentContact.name : "",
  });

  const email = useController({
    name: "email",
    control,
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email",
      },
    },
    defaultValue: currentContact ? currentContact.email : "",
  });

  const number = useController({
    name: "number",
    control,
    rules: {
      required: "Phone number is required",
      pattern: {
        value: /^\d{10}$/,
        message: "Invalid phone number",
      },
    },
    defaultValue: currentContact ? currentContact.number : "",
  });

  const onSubmit = async (data) => {
    try {
      await schema.validate(data, { abortEarly: false });
      const user = id
        ? {
            id: parseInt(id),
            name: name.field.value,
            email: email.field.value,
            number: number.field.value,
          }
        : {
            id: contacts[contacts.length - 1].id + 1,
            name: name.field.value,
            email: email.field.value,
            number: number.field.value,
          };
      if (contactToEdit) {
        dispatch(editContact(id, data, user));
        toast.success("Student updated successfully !!");
        history("/");
      } else {
        dispatch(addContact(data, user));
        toast.success("Student added successfully !!");
        history("/");
        reset();
      }
    } catch (err) {
      err.inner.forEach((error) => {
        toast.error(error.message);
      });
    }
  };

  return (
    <div className="container">
      {contactToEdit ? (
        <h1 className="display-3 my-5 text-center">Edit Student {id}</h1>
      ) : (
        <h1 className="display-3 my-5 text-center">Add Student</h1>
      )}
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                {...name.field}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className="form-group mt-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                {...email.field}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="form-group mt-3">
              <input
                type="tel"
                placeholder="Phone Number"
                className="form-control"
                {...number.field}
              />
              {errors.number && <span>{errors.number.message}</span>}
            </div>
            <div className="form-group mt-4">
              <input
                type="submit"
                value={contactToEdit ? "Update" : "Add Student"}
                className="btn btn-block btn-dark"
              />
              {console.log("heloooooo", contactToEdit)}
              {contactToEdit && (
                <Link to="/" className="btn btn-danger ms-3">
                  Cancel
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contacts;

// import { useWatch, useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { addContact, editContact } from "../Redux/Action";
// import { toast } from "react-toastify";
// import * as yup from "yup";

// const schema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   number: yup
//     .string()
//     .matches(/^\d{10}$/, "Invalid phone number")
//     .required("Phone number is required"),
// });

// const Contacts = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const history = useNavigate();
//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//     watch,
//   } = useForm
//   const contacts = useSelector((state) => state);
//   const currentContact = contacts.find(
//     (contact) => contact.id === parseInt(id)
//   );

//   const contactToEdit = currentContact ? true : false;

//   const name = useWatch({
//     control,
//     name: "name",
//     defaultValue: currentContact ? currentContact.name : "",
//   });

//   const email = useWatch({
//     control,
//     name: "email",
//     defaultValue: currentContact ? currentContact.email : "",
//   });

//   const number = useWatch({
//     control,
//     name: "number",
//     defaultValue: currentContact ? currentContact.number : "",
//   });

//   const onSubmit = async (data) => {
//     try {
//       await schema.validate(data, { abortEarly: false });
//       const user = id
//         ? {
//             id: parseInt(id),
//             name: name,
//             email: email,
//             number: number,
//           }
//         : {
//             id: contacts[contacts.length - 1].id + 1,
//             name: name,
//             email: email,
//             number: number,
//           };
//       if (contactToEdit) {
//         dispatch(editContact(id, data, user));
//         toast.success("Student updated successfully !!");
//         history("/");
//       } else {
//         dispatch(addContact(data, user));
//         toast.success("Student added successfully !!");
//         history("/");
//         reset();
//       }
//     } catch (err) {
//       err.inner.forEach((error) => {
//         toast.error(error.message);
//       });
//     }
//   };

//     return (
//     <div className="container">
//       {contactToEdit ? (
//         <h1 className="display-3 my-5 text-center">Edit Student {id}</h1>
//       ) : (
//         <h1 className="display-3 my-5 text-center">Add Student</h1>
//       )}
//       <div className="row">
//         <div className="col-md-6 shadow mx-auto p-5">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="form-group">
//             <input
//                 type="text"
//                 placeholder="Name"
//                 className="form-control"
//                 {...control.register("name")}
//                 defaultValue={currentContact ? currentContact.name : ""}
//               />
//               {errors.name && <span>{errors.name.message}</span>}
//             </div>
//             <div className="form-group mt-3">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="form-control"
//                 {...control.register("email")}
//                 defaultValue={currentContact ? currentContact.name : ""}
//               />
//               {errors.email && <span>{errors.email.message}</span>}
//             </div>
//             <div className="form-group mt-3">
//               <input
//                 type="tel"
//                 placeholder="Phone Number"
//                 className="form-control"
//                 {...control.register("number")}
//                 defaultValue={currentContact ? currentContact.name : ""}
//               />
//               {errors.number && <span>{errors.number.message}</span>}
//             </div>
//             <div className="form-group mt-4">
//               <input
//                 type="submit"
//                 value={contactToEdit ? "Update" : "Add Student"}
//                 className="btn btn-block btn-dark"
//               />
//               {console.log("heloooooo", contactToEdit)}
//               {contactToEdit && (
//                 <Link to="/" className="btn btn-danger ms-3">
//                   Cancel
//                 </Link>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contacts;
