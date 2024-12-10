import { useState, useEffect } from 'react'; // Import useEffect
import PhoneList from './PhoneList.js';
import CompanyList from './CompanyList.js';

function Contact(props) {
    const { contact, contacts, setContacts } = props;
    const [expanded, setExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(contact.name);
    const [editedAddress, setEditedAddress] = useState(contact.address);
    const [phones, setPhones] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/api/contacts/${contact.id}/phones`)
            .then((response) => response.json())
            .then((data) => setPhones(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost/api/contacts/${contact.id}/companies`)
            .then((response) => response.json())
            .then((data) => setCompanies(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    async function updateContact(e) {
        e.stopPropagation(); // Prevent the click from toggling expansion
        const response = await fetch(`http://localhost/api/contacts/${contact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: editedName, address: editedAddress }),
        });

        if (response.ok) {
            setContacts(
                contacts.map((c) =>
                    c.id === contact.id
                        ? { ...c, name: editedName, address: editedAddress }
                        : c
                )
            );
            setIsEditing(false); // Exit editing mode
        } else {
            console.error('Failed to update contact');
        }
    }

    async function doDelete(e) {
        e.stopPropagation();

        const response = await fetch(`http://localhost/api/contacts/${contact.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const newContacts = contacts.filter((c) => c.id !== contact.id);
            setContacts(newContacts);
        } else {
            console.error('Failed to delete contact');
        }
    }

    return (
        <div
            key={contact.id}
            className="contact"
            onClick={(e) => {
                if (!isEditing) setExpanded(!expanded);
            }}
        >
            <h3>Contact Summary</h3>
            <div className="name">
                <h3>Name:</h3>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedName}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                ) : (
                    <span className="style">{contact.name}</span>
                )}
            </div>

            <div className="address">
                <h3>Address:</h3>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedAddress}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setEditedAddress(e.target.value)}
                    />
                ) : (
                    <span className="style">{contact.address}</span>
                )}
            </div>
            <div className="command">
                <h4>
                    <span className="normal-text">Click to</span>
                    <span className="highlight"> expand </span>
                    <span className="normal-text">or</span>
                    <span className="highlight"> collapse lists</span>
                </h4>
            </div>


            {isEditing ? (
                <div className="editContact" >
                    <button
                        className="button green"
                        onClick={(e) => {
                            updateContact(e);
                        }}
                    >
                        Save
                    </button>
                    <button
                        className="button gray"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsEditing(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                
                <div className="contactAction" >
                    <button
                        className="button blue"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsEditing(true);
                        }}
                    >
                        Edit Contact
                    </button>
                    <button
                        className="button red"
                        onClick={(e) => {
                            doDelete(e);
                        }}
                    >
                        Delete Contact
                    </button>
                </div>
            )}

            {/* Combined Expandable Section */}
            {expanded && !isEditing && (
                <div className="collapsible-content">
                    <h4 className="collapsible-title">Company List</h4>
                    <CompanyList companies={companies}setCompanies={setCompanies}contact={contact}
                    />

                    <h4 className="collapsible-title">Phone List</h4>
                    <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
                </div>
            )}
        </div>
    );
}

export default Contact;
