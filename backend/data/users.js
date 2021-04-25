import bcrypt from 'bcryptjs'

const users =[
    {
        name:"Admin",
        email: "admin@admin.com",
        password: bcrypt.hashSync('12345678',10),
        isAdmin: true
    },
    {
        name:"Laura Smith",
        email: "laura@admin.com",
        password: bcrypt.hashSync('12345678',10)
    },
    {
        name:"Nick Dev",
        email: "nick@admin.com",
        password: bcrypt.hashSync('12345678',10)
    }
]

export default users