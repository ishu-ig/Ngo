import passwordValidator from "password-validator";

const schema = new passwordValidator();
schema
  .is().min(8)
  .is().max(100)
  .has().uppercase(1)
  .has().lowercase(1)
  .has().digits(1)
  .has().not().spaces()
  .is().not().oneOf(["Passw0rd", "Password123", "Admin@123", "Password@123"]);

export default function formValidator(e) {
  let { name, value } = e.target;
  switch (name) {
    case "name":
    case "donorName":
    case "ngoName":
    case "organizationName":
    case "title":
    case "username":
    case "subject":
    case "designation":
    case "venue":
    case "question":
      if (!value || value.trim().length === 0)
        return `${name} is required`;
      else if (value.trim().length < 2)
        return `${name} must be at least 2 characters`;
      else
        return "";

    case "email":
    case "contactEmail":
      if (!value || value.trim().length === 0)
        return "Email is required";
      else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
        return "Please enter a valid email address";
      else
        return "";

    case "phone":
    case "contactPhone":
      if (!value || value.trim().length === 0)
        return "Phone number is required";
      else if (!/^[0-9+\s()-]{7,20}$/.test(value))
        return "Please enter a valid phone number";
      else
        return "";

    case "password":
      if (!value || value.length === 0)
        return "Password is required";
      else if (!schema.validate(value))
        return "Password must be 8-100 characters with at least 1 uppercase, 1 lowercase, 1 digit, and no spaces";
      else
        return "";

    case "targetAmount":
    case "amount":
      if (!value || value <= 0)
        return "Amount must be greater than 0";
      else
        return "";

    case "shortDescription":
      if (!value || value.trim().length === 0)
        return "Short description is required";
      else if (value.trim().length > 500)
        return "Short description cannot exceed 500 characters";
      else
        return "";

    case "description":
    case "fullDescription":
    case "mission":
    case "vision":
    case "content":
    case "testimonialContent":
    case "answer":
    case "message":
      if (!value || value.trim().length === 0)
        return "This field is required";
      else
        return "";

    case "startDate":
    case "eventDate":
      if (!value)
        return "Date is required";
      else
        return "";

    case "rating":
      if (value < 1 || value > 5)
        return "Rating must be between 1 and 5";
      else
        return "";

    default:
      return "";
  }
}
