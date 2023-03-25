import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { Box, Typography, Button } from '@mui/material'
import axios from 'axios'


function Admin (props) {
  const [users, setUsers] = React.useState([])

  const handleCheckbox = e => {
    const { name, checked } = e.target
    console.log('name', name)
    if (name === 'allSelect') {
      let tempUser = users.map(user => {
        return { ...user, isChecked: checked }
      })
      console.log("all", tempUser);
      setUsers(tempUser)
    } else {
      let tempUser = users.map(user =>
        user.username === name ? { ...user, isChecked: checked } : user
      )
      console.log("single", tempUser);
      setUsers(tempUser)
    }
  }

 const fetchData = async () => {
    const result = await axios.get('http://localhost:3001/users').then(response => {
      if (response.data.message) {
        console.log(response.data.message)
      } else {
        return response.data
      }
    })
   
    setUsers(result)
  }

  React.useEffect(()=>{fetchData()}, [])

  return (
    <Box sx={{ mt: '5%' }}>
      <Paper
        style={{
          width: '70%',
          margin: 'auto',
          marginBottom: '10px',
          padding: '10px',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          columnGap: '10px'
        }}
      >
        <Button size='small' variant='contained' color='error'>
          Block
        </Button>
        <Button size='small' variant='contained' color='info'>
          Unblock
        </Button>
        <Button size='small' variant='contained' color='secondary'>
          Delete
        </Button>
      </Paper>
      <TableContainer
        component={Paper}
        style={{ width: '70%', margin: 'auto' }}
      >
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead sx={{background:'#E8F8FD'}}>
            <TableRow>
              <TableCell>
                {users.length > 0 ? (
                  <Checkbox
                    name='allSelect'
                    checked={!users.some(user => user?.isChecked !== true)}
                    onChange={handleCheckbox}
                  />
                ) : (
                  <Checkbox />
                )}
              </TableCell>
              <TableCell>id</TableCell>
              <TableCell>username</TableCell>
              <TableCell>e-mail</TableCell>
              <TableCell>last login time</TableCell>
              <TableCell>registration time</TableCell>
              <TableCell>status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? users.map(row => (
              <TableRow
                key={row.ID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Checkbox
                    name={row.username}
                    checked={row?.isChecked || false}
                    onChange={handleCheckbox}
                  />
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.ID}
                </TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell component='th' scope='row'>
                  {row.email}
                </TableCell>
                <TableCell>{row.lastLoginTime}</TableCell>
                <TableCell component='th' scope='row'>
                  {row.registerTime}
                </TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            )) : ''}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Admin
