import { ContactModel } from "@jworkman-fs/asl"
const { 
    ContactModel,
    Pager,
    sortContacts,
    filterContacts
  } = require("@jworkman-fs/asl") 

const update = (req, res) => {
  try { // Place your CRUD code here inside the try block
    
    const filtered = Contact.filter( contacts, req.get('X-Filter-By'), req.get('X-Filter-Value') )
    res.json(filtered)

    const sorted = sortContacts( contacts, req.query.sort, req.query.direction )
    res.json(sorted)

    const pager = new Pager( contacts, req.query.page, req.query.size )
    res.set("X-Page-Total", pager.total())
    res.set("X-Page-Next", pager.next())
    res.set("X-Page-Prev", pager.prev())
    res.json(pager.results())

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