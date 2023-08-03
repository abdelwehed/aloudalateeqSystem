const labels = ['Staff 1', 'Mohamed Ali', 'Staff 3'];

export const dailySalesData = {
  labels,
  datasets: [
    {
      label: 'Goal',
      data: labels.map(() => 800),
      backgroundColor: '#9a692b',
    },
    {
      label: 'current Sales',
      data: labels.map(() => 500),
      backgroundColor: '#e7bd67',
    },
  ],
};

const productLabels = ['Product 1', 'Product 2', 'Product 3'];

export const productsSalesOptions = {
  indexAxis: 'y' as const,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Products sales',
    },
  },
};

export const productsSalesData = {
  labels: productLabels,
  datasets: [
    {
      label: 'Goal',
      data: labels.map(() => 1500),
      backgroundColor: 'green',
    },
    {
      label: 'current Sales',
      data: labels.map(() => 1400),
      backgroundColor: 'red',
    },
  ],
};

export const dailySalesOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Daily sales',
    },
  },
};

export const monthlySalesData = {
  labels,
  datasets: [
    {
      label: 'Goal',
      data: labels.map(() => 800),
      backgroundColor: '#9a692b',
    },
    {
      label: 'current Sales',
      data: labels.map(() => 500),
      backgroundColor: '#e7bd67',
    },
  ],
};

export const monthlySalesOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly sales',
    },
  },
};
