import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';

const MailList = ({mails}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1350 }} aria-label="mail table">
        <TableHead >
          <TableRow className="bg-custom-blue">
            <TableCell variant="h5" className="text-white">Primary</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mails.map((mail) => (
            <TableRow
              key={mail._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell 
                component="th" 
                scope="row"
              >
                {mail.contact}
              </TableCell>
              <TableCell 
                align="left" 
                className="break-words"
              >
                {`${mail.subject} - ${mail.body}`}
              </TableCell>
              <TableCell 
                align="left"
                className="w-1/4"
              >
                {mail.createdAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MailList;
