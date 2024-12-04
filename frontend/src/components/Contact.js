import { useState, useEffect } from 'react';  // import useEffect
import PhoneList from './PhoneList.js';

function Contact(props) {
    const {contact, contacts, setContacts} = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contact.id + '/phones')
            .then(response => response.json())
            .then(data => setPhones(data))
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
                    <span className='highlight'> collapse</span>
                </h4>
            </div>


            
            <div className='title' style={{ textAlign: 'left', width: '100%' }}>
             <button className='button red' onClick={doDelete}>Delete Contact</button>
            </div>
          

            

            <div style={expandStyle}>
                <hr />
                <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
            </div>
        </div>
    );
}

export default Contact;
