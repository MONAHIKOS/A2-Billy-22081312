import { useState, useEffect } from 'react';  // import useEffect
import PhoneList from './PhoneList.js';
import CompanyList from './CompanyList.js';

function Contact(props) {
    const {contact, contacts, setContacts} = props;
    const [expanded, setExpanded] = useState(false);
    const [expandedPhoneList, setExpandedPhoneList] = useState(false);
    const [expandedCompanyList, setExpandedCompanyList] = useState(false);
    const [phones, setPhones] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contact.id + '/phones')
            .then(response => response.json())
            .then(data => setPhones(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    
    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contact.id + '/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();

        const response = await fetch('http://localhost/api/contacts/' + contact.id, {
            method: 'DELETE',
        });

        let newContacts = contacts.filter((c) => {
            return c.id !== contact.id;
        });

        setContacts(newContacts);
    }

    return (
        <div key={contact.id} className='contact' onClick={(e) => setExpanded(!expanded)}>
             <h3>Contact Summary</h3>
            <div className='name'>
                <h3>
                    Name: <span className='unbold'>{contact.name}</span>
                </h3>
            </div>

            <div className='address'>
                <h3>
                    Address: <span className='unbold'>{contact.address}</span>
                </h3>
            </div>
            
            <div className='command'>
                <h4>
                    <span className='normal-text'>Click to</span> 
                    <span className='highlight'> expand </span>
                    <span className='normal-text'>or</span> 
                    <span className='highlight'> collapse {contact.name}'s phone list</span>
                </h4>
            </div>
            
            <div className='title' style={{ marginTop: '10px',textAlign: 'left', width: '100%' }}>
             <button className='button red' onClick={doDelete}>Delete Contact</button>
            </div>

            {/* Combined Expandable Section */}
            {expanded && (
                <div className="collapsible-content">
                    <h4 className="collapsible-title">Company List</h4>
                    <CompanyList companies={companies} setCompanies={setCompanies} contact={contact} />

                    <h4 className="collapsible-title">Phone List</h4>
                    <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
                </div>
            )}
        </div>
    );
}

export default Contact;