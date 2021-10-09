import { useState, useEffect } from 'react';
import * as C from './App.styles'
import { Item } from './types/Item';
import { Category } from './types/Category';
import { categories } from './data/categories';
import { items } from './data/items';
import { filterListByMonth, getCurrentMonth } from './helpers/dateFilter';
import { TableArea } from './Components/TableArea';
import { InfoArea } from './Components/InfoArea';
import { InputArea } from './Components/InputArea';

const App = ( )=>{
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

   useEffect(()=>{
    setFilteredList( filterListByMonth(list, currentMonth) );
  }, [list, currentMonth]);

  useEffect(()=>{
    let incomeCount = 0;
    let expenseCount = 0;

    for(let i in filteredList) {
      if(categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  }

  const handleAddItem = (item: Item) => {
    let newList = [...list];
    newList.push(item);
    setList(newList);
  }

  return(
    <C.Container>
      <C.Header>
        <C.HeaderText>
            Sis - Finanças
        </C.HeaderText>
      </C.Header>
      <C.Body>

        {/*ÁREA DE INFORMAÇÕES */}
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />
        {/*ÁREA DE INSERÇÃO */}
        <InputArea onAdd={handleAddItem} />

        {/*TABELA DE ITENS */}
        <TableArea list={filteredList} />

      </C.Body>
    </C.Container>
  ); 
}
export default App;