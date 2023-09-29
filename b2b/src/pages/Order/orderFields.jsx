import AddressSelector from "../../components/AddressSelector";
// import PaymantSelector from "../../components/PaymantSelector";

export const shippingOrderFields = [
  {
    tagType: 'custom',
    content(fn) {
      return <AddressSelector onSelect={fn} key="savedAdresses" />
    }
  },
  {
    tagType: 'regular',
    label: "Country",
    id: "countryName",
    name: "countryName",
    type: "text",
    placeholder: "Spain",
  },
  {
    tagType: 'regular',
    label: "Index",
    id: "index",
    name: "index",
    type: "number",
    placeholder: "08013"
  },
  {
    tagType: 'regular',
    label: "Area or Region",
    id: "region",
    name: "region",
    type: "text",
    placeholder: "Catalonia"
  },
  {
    tagType: 'regular',
    label: "City",
    id: "city",
    name: "city",
    type: "text",
    placeholder: "Barcelona"
  },
  {
    tagType: 'regular',
    label: "Street",
    id: "street",
    name: "street",
    type: "text",
    placeholder: "C/ de València"
  },
  {
    tagType: 'regular',
    label: "House number",
    id: "house",
    name: "house",
    type: "text",
    placeholder: "404"
  },
  {
    tagType: 'regular',
    label: "Apartment or office number",
    id: "apartment",
    name: "apartment",
    type: "text",
    placeholder: "12"
  },
  {
    tagType: 'regular',
    label: "First Name",
    id: "firstName",
    name: "firstName",
    type: "text",
    placeholder: "Pedro",
  },
  {
    tagType: 'regular',
    label: "Last Name",
    id: "lastName",
    name: "lastName",
    type: "text",
    placeholder: "Sánchez",
  },
  {
    tagType: 'regular',
    label: "Email",
    id: "email",
    name: "email",
    type: "email",
    placeholder: "example@email.com",
  },
  {
    tagType: 'masked',
    label: "Phone number",
    id: "telephone",
    name: "telephone",
    type: "text",
    placeholder: "+############",
    format: "+############",
    mask: "#",
  },
  {
    tagType: 'regular',
    label: "Remember",
    id: "save",
    name: "save",
    type: "checkbox",
  },
  {
    tagType: 'custom',
    id: 'divider',
    content() {
      return (
        <div key="divider">
          <div style={{ height: '2px', background: '#5d5d5d', boxShadow: '1px 5px 10px rgba(0, 0, 0, 0.4)', marginBottom: '2rem' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Payment:</h3>
        </div>
      )
    }
  },
  {
    tagType: 'regular',
    label: "IBAN",
    id: "IBAN",
    name: "paymentInfo",
    type: "radio",
    value: "IBAN",
  },
  {
    tagType: 'regular',
    label: "CARD",
    id: "CARD",
    name: "paymentInfo",
    type: "radio",
    value: "CARD",
  },
]
