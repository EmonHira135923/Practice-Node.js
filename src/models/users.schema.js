
// Create User Schema
export const createUser = (data) => {
    return {
        name:data.name,
        email:data.email,
        password:data.password,
        phone:data.phone,
        createdAt: new Date(),
        updatedAt: null
    }
}