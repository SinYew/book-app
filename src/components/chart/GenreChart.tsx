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
const labels = books.map(book => book.genre)
  .filter((value, index, self) => self.indexOf(value) === index);

// get book counts based on genre
const booksData = books.reduce((previous: any, current) => {
  const genre = current.genre;
  if (!previous.hasOwnProperty(genre)) {
    previous[genre] = 0;
  }
  previous[genre]++;
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
      text: 'Books by genre',
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Books',
      data: booksData,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

const GenreChart = () => {

  return (
    <Grid item xs={12} xl={10} maxWidth={"lg"}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Bar options={options} data={data} />
      </Paper>
    </Grid>
  )
}

export default GenreChart
