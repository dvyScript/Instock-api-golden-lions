//Validate form inputs
export const validateWarehouseFields = (req, res, next) => {
    const {
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email
    } = req.body;

    if (
        !warehouse_name ||
        !address ||
        !city ||
        !country ||
        !contact_name ||
        !contact_position ||
        !contact_phone ||
        !contact_email
    ) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    //Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact_email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate phone number format
    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?\(?(\d{3})\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    if (!phoneRegex.test(contact_phone)) {
        return res.status(400).json({ message: 'Invalid phone number format' });
    }
    
    next();
};
