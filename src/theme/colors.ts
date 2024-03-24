// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  primary: '#2F50C1',
  primary100: '#4169E1',
  primary200: '#D9E6FD',
  primary300: '#6E91EC',
  grey: '#EAE7F2',
  green: '#25D366',
  tagRecieved: '#D9E6FD',
  tagRecieved100: '#2F50C1',
  tagError: '#FEE3D4',
  tagError100: '#D12030',
  tagDelivered: '#E3FAD6',
  tagDelivered100: '#208D28',
  tagCancelled: '#F4F2F8',
  tagCancelled100: '#58536E',
  tagHold: '#FFF3D5',
  tagHold100: '#DB7E21',
} as const;

export const colors = {
  palette,
  background: '#fff',
};
