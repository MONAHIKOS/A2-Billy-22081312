import { useState } from 'react';

function NewContact(props) {
    const { contacts, setContacts } = props;
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    async function createContact(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                address,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setContacts([...contacts, data]);
            setName('');
            setAddress('');
            setErrorMessage(''); // Clear any previous error message
        } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message); // Set error message
        }
    }

    return (
        <form className="new-contact" onSubmit={createContact}>
            
            <input 
                type='text' 
                placeholder='Name' 
                onChange={(e) => setName(e.target.value)} 
                value={name}
            />
            <input 
                type='text' 
                placeholder='Address' 
                onChange={(f) => setAddress(f.target.value)} 
                value={address}
            />
            <button className="button green" type="submit">
                Create Contact
            </button>

            {/* Inline Error Message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    );
}

export default NewContact;
