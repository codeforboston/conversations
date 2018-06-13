export const videos = [
  {
    youtubeVideoId: '_LroBWpJ4Ps',
    asset: require('./assets/Object1PepperSpray.png'),
  },
  {
    youtubeVideoId: 'bXChsVqt4qo', // corresponds to video at https://www.youtube.com/watch?v=bXChsVqt4qo
    asset: require('./assets/Object2ChilliPowder.png'), // corresponds to image located in this repository
  },
  {
    youtubeVideoId: '2J1BGnyu7Hk',
    asset: require('./assets/Object3Pigeon.png'),
  },
  // {
  //   youtubeVideoId: '_LroBWpJ4Ps',
  //   asset: require('./assets/Object4SafetyPin.png'),
  // },
  {
    youtubeVideoId: 'GEmnflI3mu8',
    asset: require('./assets/RemnantsAppearPlate.png'),
    isRemnant: true,
  },
  // {
  //   youtubeVideoId: '_LroBWpJ4Ps',
  //   asset: require('./assets/Object5Elbow.png'),
  // },
  // {
  //   youtubeVideoId: '_LroBWpJ4Ps',
  //   asset: require('./assets/Object6Hundred.png'),
  // },
  // {
  //   youtubeVideoId: '_LroBWpJ4Ps',
  //   asset: require('./assets/Object7Umbrella.png'),
  // },
  // {
  //   youtubeVideoId: '_LroBWpJ4Ps',
  //   asset: require('./assets/Object8Slipper.png'),
  // },

];

export const remnants = [
{ 
  id: 1, 
  picture: require('./assets/remnant1v1v1v1.png'),
  audio: 'remnant_1.mp3',
  flex: 2,
}, 
{ 
  id: 2,
  picture: require('./assets/remnant2v1v1v1.png'),
  audio: 'remnant_2.mp3',
  flex: 1,
}, 
{
  id: 3,
  picture: require('./assets/remnant3v1v1v1.png'),
  audio: 'remnant_3.mp3',
  flex: 1,
}, 
{
  id: 4,
  picture: require('./assets/remnant4v1v1v1.png'),
  audio: 'remnant_4.mp3',
  flex: 2,
}, 
{
  id: 5,
  picture: require('./assets/remnant5v1v1v1.png'),
  audio: 'remnant_5.mp3',
  flex: 1,
}, 
{
  id: 6,
  picture: require('./assets/remnant6v1v1v1.png'),
  audio: 'remnant_6.mp3',
  flex: 2,
},
];





export const remnantsPlaceHolders = [
  {id: 0,
  image: require('./assets/RemnantsAppearPlate.png'),
  audio: 'remnant_1.mp3',
},{id: 1,
  image: require('./assets/CITYORNAMENT5.png'),
  audio: 'remnant_2.mp3',
},{id: 2,
  image: require('./assets/Aashiyaan.png'),
  audio: 'remnant_3‘.mp3',
},
]

export const ENGLISH = 'English';
export const HINDI = 'Hindi';

export default { videos };
