import React from 'react'
import { Grid, Paper } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { books } from '../../data/books';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// get label from books store
const labels = books.map(book => book.yearPublished)
  .filter((value, index, self) => self.indexOf(value) === index).sort();

// get book counts based on year published
const booksData = books.reduce((previous: any, current) => {
  const year = current.yearPublished;
  if (!previous.hasOwnProperty(year)) {
    previous[year] = 0;
  }
  previous[year]++;  
  return previous;
}, {});

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Books by year published',
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Books',
      data: booksData,
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
  ],
};

const YearPublishChart = () => {

  return (
    <Grid item xs={12} xl={10} maxWidth={"lg"}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Bar options={options} data={data} />
      </Paper>
    </Grid>
  )
}

export default YearPublishChart
