import { useController, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addContact, editContact } from "../Services/Actions/Action";
import { toast } from "react-toastify";
import schema from "./ValidationSchema";

const UserProfile = () => {
  const dispatch = useDispatch(); // Dispatch function from the react-redux hook
  const { id } = useParams(); // Id parameter from the URL using the useParams hook
  const history = useNavigate(); // History object from the react-router-dom
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(); // Form control functions from the react-hook-form
  const contacts = useSelector((state) => state); // Get the contacts array from the redux store using the useSelector hook
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  ); // Find the current contact based on the id parameter

  const contactToEdit = currentContact ? true : false; // Determine if the component is used for editing or adding a contact

  // Use the useController hook to get the name, email, and number fields and their validation rules
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

  // Define the onSubmit function, which will be called when the form is submitted
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
          }; // Create a new contact object based on the form data and the current contact id
      if (contactToEdit) {
        dispatch(editContact(id, data, user)); // Dispatch the editContact action if the component is used for editing
        toast.success("Student updated successfully !!"); // Show a success toast message
        history("/"); // Navigate to the home page
      } else {
        dispatch(addContact(data, user)); // Dispatch the addContact action if the component is used for adding a new contact
        toast.success("Student added successfully !!");
        history("/");
        reset(); // Reset the form after submission
      }
    } catch (err) {
      // Iterate through each error message and display it using react-toastify
      err.inner.forEach((error) => {
        toast.error(error.message);
      });
    }
  };

  return (
    <div className="container">
      {/* The contactToEdit prop is used to conditionally render a heading based on whether the form is for adding a new student or editing an existing one. */}
      {contactToEdit ? (
        <h1 className="display-3 my-5 text-center">Edit Student {id}</h1>
      ) : (
        <h1 className="display-3 my-5 text-center">Add Student</h1>
      )}
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Form inputs */}
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
export default UserProfile;
