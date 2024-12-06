import Company from './Company.js';
import NewCompany from './NewCompany.js';

function CompanyList(props) {
    const { contact, companies, setCompanies } = props;
    
    return (
        <div className='company-list'>
        
            {/* Add NewCompany component */}
            <NewCompany companies={companies} setCompanies={setCompanies} contact={contact} />

            {/* Company table */}
            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <Company key={company.id} company={company} companies={companies} setCompanies={setCompanies} contact={contact}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default CompanyList;
