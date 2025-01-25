import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './components/Searchresult/Searchresult';

export const BASE_URL = "https://food-backend-4-ofly.onrender.com/";

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [FilteredData,setFilteredData]=useState(null)
  const [error, setError] = useState(null);
  const [selectBtn,setSelectBtn]=useState("all")

  const filterbtn=[
    {name:"All",
      type:"all"
    },
    {name:"Breakfast",
      type:"breakfast"
    },
    {name:"Lunch",
      type:"lunch"
    },
    {name:"Dinner",
      type:"dinner"
    },

  ]

  
  useEffect(() => {
    const FetchFoodData = async () => {
      setLoading(true)
      try {
        const response = await fetch(BASE_URL);

        const Json = await response.json();

        setData(Json);
        setFilteredData(Json)
        setLoading(false)
      } catch (error) { setError("unable to fetch data") }
    };
    FetchFoodData();

  }, [])

   function SearchFood(e){
   const Searchvalue = e.target.value;
   if(Searchvalue===""){
    setFilteredData(null);
   }
   const filter = data?.filter((item)=>item.name.toLowerCase().includes(Searchvalue.toLowerCase()));
   setFilteredData(filter)
  };

  const filterFood=(type)=>{
    if (type === "all"){
      setFilteredData(data);
      setSelectBtn("all");
      return;
    }
    const filter = data?.filter((item)=>item.type.toLowerCase().includes(type.toLowerCase()));

    setFilteredData(filter);
    setSelectBtn(type);
   

  };
  
  if (error) return <div>{error}</div>
  if (loading) return <div>loading...</div>
  return (
    <>
      <Cointainer>
        <TopCointainer>
          <div className='logo'>
            <img src='/logo.svg' alt='logo' />
          </div>
          <div className='search' onChange={SearchFood}>
            <input type='text' placeholder='Search Food...' />
          </div>
        </TopCointainer>
        <FilterCointainer>
          {filterbtn.map((v)=>(<Button isSelected={selectBtn === v.type} key={v.name} onClick={ ()=> filterFood(v.type)}>{v.name}</Button>))}         
          

        </FilterCointainer>


      </Cointainer>
      <SearchResult data={FilteredData} />
    </>)
} export default App;

export const Cointainer = styled.div`
max-width:1200px;
margin:0 auto;
`;

const TopCointainer = styled.section`
height:140px;
display:flex;
justify-content: space-between;
padding: 16px;
align-items:center;
// border:1px solid black;  
.search{
input{
background-color:transparent;
border:1px solid red;
color:white;
border-radius:5px;
height:40px;
font-size:16px;
padding:0 10px;
}
}
@media(0 < width <600px){
flex-direction:column;
height:120px
}
`;
const FilterCointainer = styled.section`
display:flex;
justify-content:center;
gap:12px;
padding-bottom:20px;


`;

export const Button = styled.button`
background-color:${({isSelected})=>(isSelected ?"rgb(95, 2, 2)": " #FF4343")}  ;
outline:1px solid  ${({isSelected})=>(isSelected ?"white": " #FF4343")}  ;
border-radius:5px;
padding:6px 12px;
border:none;
color:white;
cursor:pointer;
&:hover{
background-color:rgb(129, 21, 4);
}

`;
