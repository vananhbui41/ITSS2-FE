import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import { getHistory } from '../../api/search';

const History = () => {
  const [listHistory, setListHistory] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await getHistory();
      setListHistory(res.data);
    };
    fetch();
  },[]);
  return (
    <>
      <h2 className="text-center">Lịch Sử</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Từ Vựng</TableCell>
              <TableCell>Bối Cảnh</TableCell>
              <TableCell>Loại Từ</TableCell>
              <TableCell>Chủ Đề</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listHistory &&
              listHistory.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.word} ({row.furigana})
                  </TableCell>
                  <TableCell>
                    {row.categories.context?.map((e) => (
                      <Chip key={e.id} label={e.name} />
                    ))}
                  </TableCell>
                  <TableCell>
                    {row.categories.type?.map((e) => (
                      <Chip key={e.id} label={e.name} />
                    ))}
                  </TableCell>
                  <TableCell>
                    {row.categories.topic?.map((e) => (
                      <Chip key={e.id} label={e.name} />
                    ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default History;
