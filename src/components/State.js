const States = [
    { value: 'AL', label: 'AL' },
    { value: 'AK', label: 'AK' },
    { value: 'AZ', label: 'AZ' },
    { value: 'AR', label: 'AR' },
    { value: 'CA', label: 'CA' },
    { value: 'CO', label: 'CO' },
    { value: 'CT', label: 'CT' },
    { value: 'DE', label: 'DE' },
    { value: 'FL', label: 'FL' },
    { value: 'GA', label: 'GA' },
    { value: 'HI', label: 'HI' },
    { value: 'ID', label: 'ID' },
    { value: 'IL', label: 'IL' },
    { value: 'IN', label: 'IN' },
    { value: 'IA', label: 'IA' },
    { value: 'KS', label: 'KS' },
    { value: 'KY', label: 'KY' },
    { value: 'LA', label: 'LA' },
    { value: 'ME', label: 'ME' },
    { value: 'MD', label: 'MD' },
    { value: 'MA', label: 'MA' },
    { value: 'MI', label: 'MI' },
    { value: 'MN', label: 'MN' },
    { value: 'MS', label: 'MS' },
    { value: 'MO', label: 'MO'},
    { value: 'MT', label: 'MT'},
    { value: 'NE', label: 'NE'},
    { value: 'NV', label: 'NV'},
    { value: 'NH', label: 'NH'},
    { value: 'NJ', label: 'NJ'},
    { value: 'NM', label: 'NM'},
    { value: 'NY', label: 'NY'},
    { value: 'ND', label: 'ND'},
    { value: 'OH', label: 'OH'},
    { value: 'OK', label: 'OK'},
    { value: 'OR', label: 'OR'},
    { value: 'PA', label: 'PA'},
    { value: 'RI', label: 'RI'},
    { value: 'SC', label: 'SC'},
    { value: 'SD', label: 'SD'},
    { value: 'TN', label: 'TN'},
    { value: 'TX', label: 'TX'},
    { value: 'UT', label: 'UT'},
    { value: 'VT', label: 'VT'},
    { value: 'VA', label: 'VA'},
    { value: 'WA', label: 'WA'},
    { value: 'WV', label: 'WV'},
    { value: 'WI', label: 'WI'},
    { value: 'WY', label: 'WY'}
  ]

const Type = [
    {value: 'Any', label: 'Any'},
    {value: 'private', label: 'Private'},
    {value: 'public', label: 'Public'}
]

const App = [
    {value: 'Any', label: 'Any'},
    {value: 'commonapp', label: 'Common Application'},
    {value: 'coalitionapp', label: 'Coalition Application'}
]

const Sortby = [
    {value: "national_ranking", label: 'National Ranking'},
    {value: "tuition_normal", label: 'In State Tuition'},
    {value: "tuition_oos", label: 'Out of State Tuition'},
    {value: "acceptance_rate", label: 'Acceptance Rate'},
    {value: "app_fee", label: 'Application Fee'},
    {value: "population", label: 'Population'}
]

const TuitionState = [
    {value: "both", label: 'In State or Out of State'},
    {value: "tuition_normal", label: 'In State Tuition'},
    {value: "tuition_oos", label: 'Out of State Tuition'},
]

const LOR = [
    {value: "Any", label: 'Any'},
    {value: 0, label: '0'},
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},  
]

const OrderBy = [
    {value: false, label: "Low to High"},
    {value: true, label: 'High to Low'},
]

export {
    States,
    Type,
    App,
    Sortby,
    LOR,
    TuitionState,
    OrderBy
  }