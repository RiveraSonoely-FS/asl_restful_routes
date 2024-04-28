const { 
    ContactModel,
    Pager,
    sortContacts,
    filterContacts
  } = require("@jworkman-fs/asl")

const pager = new Pager( contacts, req.query.page, req.query.size )
res.set("X-Page-Total", pager.total())
res.set("X-Page-Next", pager.next())
res.set("X-Page-Prev", pager.prev())
res.json(pager.results())

const sorted = sortContacts( contacts, req.query.sort, req.query.direction )
res.json(sorted)

const filtered = Contact.filter( contacts, req.get('X-Filter-By'), req.get('X-Filter-Value') )
res.json(filtered)