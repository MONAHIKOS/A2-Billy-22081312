// All imports should appear at the top of the file
import Phone from './Phone.js';
import NewPhone from './NewPhone.js';

// PhoneList component definition
function PhoneList(props) {
    const { contact, phones, setPhones } = props;
    
    return (
        <div className='phone-list'>
        
            {/* Add NewPhone component */}
            <NewPhone phones={phones} setPhones={setPhones} contact={contact} />

            {/* Phone table */}
            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th>Phone Type</th>
                        <th>Phone Number</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {phones.map((phone) => (
                        <Phone key={phone.id} phone={phone} phones={phones} setPhones={setPhones} contact={contact}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// The export statement must be outside of any function or block
export default PhoneList;
