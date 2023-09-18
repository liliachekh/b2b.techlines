export const accountFields = [
  {
    tagType: 'regular',
    label: "Contact Person",
    id: "contactPerson",
    name: "contactPerson",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    tagType: 'regular',
    label: "Email address",
    id: "email",
    name: "email",
    type: "text",
    placeholder: "Enter your email",
  },
  {
    tagType: 'masked',
    label: "Phone Number",
    id: "telephone",
    name: "telephone",
    type: "text",
    format: "+############",
    mask: "#",
  }
]

export const passwordFields = [
  {
    tagType: 'regular',
    label: "Current password",
    id: "curPassword",
    name: "curPassword",
    type: "password",
    placeholder: "*******",
  },
  {
    tagType: 'regular',
    label: "New password",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "*******",
  },
  {
    tagType: 'regular',
    label: "Confirm new password",
    id: "confPassword",
    name: "confPassword",
    type: "password",
    placeholder: "*******",
  },
]