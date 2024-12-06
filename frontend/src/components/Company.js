import { useState } from 'react';

function Company(props) {
    const { contact, company, companies, setCompanies } = props;
    const [isEditing, setIsEditing] = useState(false); 
    const [editedCompanyName, setEditedCompanyName] = useState(company.company_name);
    const [editedCompanyAddress, setEditedCompanyAddress] = useState(company.company_address);

    async function deleteCompany() {
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/companies/' + company.id, {
            method: 'DELETE',
        });

        let newCompanies = companies.filter((y) => {
            return y.id !== company.id;
        });

        setCompanies(newCompanies);
    }

    async function updateCompany() {
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/companies/' + company.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                company_name: editedCompanyName,
                company_address: editedCompanyAddress,
            }),
        });

        if (response.ok) {
            let updatedCompanies = companies.map((c) =>
                c.id === company.id
                    ? { ...c, company_name: editedCompanyName, company_address: editedCompanyAddress }
                    : c
            );
            setCompanies(updatedCompanies);
            setIsEditing(false); 
        } else {
            console.error('Failed to update company');
        }
    }

    return (
        <tr>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedCompanyName}
                        onChange={(e) => setEditedCompanyName(e.target.value)}
                    />
                ) : (
                    company.company_name
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedCompanyAddress}
                        onChange={(e) => setEditedCompanyAddress(e.target.value)}
                    />
                ) : (
                    company.company_address
                )}
            </td>
            <td style={{ width: '14px' }}>
                {isEditing ? (
                    <>
                        <button className="button green" onClick={updateCompany}>
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
                        <button className="button red" onClick={deleteCompany}>
                            Delete
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
}

export default Company;
