import { useState } from 'react';

function Phone(props) {
    const { contact, phone, phones, setPhones } = props;
    const [isEditing, setIsEditing] = useState(false); 
    const [editedPhoneType, setEditedPhoneType] = useState(phone.phone_type); 
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(phone.phone_number); 

    async function deletePhone() {
        const response = await fetch(
            `http://localhost/api/contacts/${contact.id}/phones/${phone.id}`,
            {
                method: 'DELETE',
            }
        );

        let newPhones = phones.filter((p) => {
            return p.id !== phone.id;
        });

        setPhones(newPhones);
    }

    async function updatePhone() {
        const response = await fetch(
            `http://localhost/api/contacts/${contact.id}/phones/${phone.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_type: editedPhoneType,
                    phone_number: editedPhoneNumber,
                }),
            }
        );

        if (response.ok) {
            let updatedPhones = phones.map((p) =>
                p.id === phone.id
                    ? { ...p, phone_type: editedPhoneType, phone_number: editedPhoneNumber }
                    : p
            );
            setPhones(updatedPhones);
            setIsEditing(false); // Exit editing mode
        } else {
            console.error('Failed to update phone');
        }
    }

    return (
        <tr>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedPhoneType}
                        onChange={(e) => setEditedPhoneType(e.target.value)}
                    />
                ) : (
                    phone.phone_type
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedPhoneNumber}
                        onChange={(e) => setEditedPhoneNumber(e.target.value)}
                    />
                ) : (
                    phone.phone_number
                )}
            </td>
            <td style={{ width: '14px' }}>
                {isEditing ? (
                    <>
                        <button className="button green" onClick={updatePhone}>
                            Save
                        </button>
                        <button className="button gray" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button className="button blue" onClick={() => setIsEditing(true)}>
                            Update
                        </button>
                        <button className="button red" onClick={deletePhone}>
                            Delete
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
}

export default Phone;
