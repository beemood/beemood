import type { Prisma } from '@prisma/client';

export const productData: Prisma.ProductUncheckedCreateInput[] = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description:
      'Immerse yourself in pure audio with these premium wireless headphones featuring advanced noise-cancelling technology, comfortable earcups, and long-lasting battery life.',
    barcode: '9780123456789012',
  },
  {
    name: 'Smart Home Security Camera',
    description:
      'Keep an eye on your home with this intelligent security camera offering 1080p HD video, two-way audio, motion detection, and cloud storage options.',
    barcode: '9780123456789013',
  },
  {
    name: 'Portable Bluetooth Speaker',
    description:
      'Enjoy your music on the go with this compact and powerful Bluetooth speaker, delivering rich sound and deep bass, with a durable, splash-proof design.',
    barcode: '9780123456789014',
  },
  {
    name: 'Ergonomic Office Chair',
    description:
      'Enhance your work comfort with this adjustable ergonomic office chair, featuring lumbar support, breathable mesh back, and a recline function for optimal posture.',
    barcode: '9780123456789015',
  },
  {
    name: 'High-Speed USB-C Hub',
    description:
      "Expand your laptop's connectivity with this versatile USB-C hub, offering multiple USB 3.0 ports, HDMI, Ethernet, and an SD card reader.",
    barcode: '9780123456789016',
  },
  {
    name: 'Organic Green Tea Variety Pack',
    description:
      'Discover a delightful assortment of organic green teas, including sencha, matcha, and jasmine, known for their refreshing taste and antioxidant properties.',
    barcode: '9780123456789017',
  },
  {
    name: 'Stainless Steel Water Bottle (24oz)',
    description:
      'Stay hydrated with this durable and insulated stainless steel water bottle, keeping your drinks cold for 24 hours and hot for 12 hours.',
    barcode: '9780123456789018',
  },
  {
    name: 'Digital Drawing Tablet',
    description:
      'Unleash your creativity with this responsive digital drawing tablet, perfect for artists and designers, featuring pressure sensitivity and customizable shortcut keys.',
    barcode: '9780123456789019',
  },
  {
    name: 'Smart LED Light Bulbs (2-Pack)',
    description:
      'Transform your home lighting with these smart LED bulbs, controllable via smartphone, offering millions of colors and adjustable white light for any mood.',
    barcode: '9780123456789020',
  },
  {
    name: 'Portable Power Bank (10000mAh)',
    description:
      'Never run out of battery again with this high-capacity portable power bank, providing multiple charges for your smartphone and other devices.',
    barcode: '9780123456789021',
  },
];
