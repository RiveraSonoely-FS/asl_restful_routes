import { ContactModel } from "@jworkman-fs/asl"
  
const update = (req, res) => {
  try { // Place your CRUD code here inside the try block
  
    // Update the contact
    ContactModel.update( req.params.id, res.body )
    
    // Issue the redirect
    res.status( 303 ).redirect( `/contacts/${req.params.id}` )
    
  } catch (e) { // Define your error handling here in the catch block
  
    switch(e.name) {
      case "InvalidContactError":
        return res.status(400).json({ message: e.message })
        break;
      case "ContactNotFoundError":
        return res.status(404).json({ message: e.message })
        break;
      default:
        return res.status(500).json(e)
        break;
    }
  }
}