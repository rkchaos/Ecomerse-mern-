const mongoose = require('mongoose');
const Product = require('./models/Product');

let dummyQuotes = [
    {
        name: "Wooden sofa",
        img: "https://plus.unsplash.com/premium_photo-1683120738120-9df95a042a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHdvb2RlbiUyMHNvZmF8ZW58MHx8MHx8fDA%3D",
        price: 2000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Wooden sofa",
        img:"https://plus.unsplash.com/premium_photo-1683121279572-52638bb63c13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29vZGVuJTIwc29mYXxlbnwwfHwwfHx8MA%3D%3D",
        price: 3000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Wooden sofa",
        img:"https://plus.unsplash.com/premium_photo-1683120738120-9df95a042a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHdvb2RlbiUyMHNvZmF8ZW58MHx8MHx8fDA%3D",
        price: 4000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Wooden sofa",
        img:"https://images.unsplash.com/photo-1633556992199-b2e9343e36fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHdvb2RlbiUyMHNvZmF8ZW58MHx8MHx8fDA%3D",
        price: 5000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Fabric sofa",
        img:"https://plus.unsplash.com/premium_photo-1661780295073-98db12600af0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFicmljJTIwc29mYXxlbnwwfHwwfHx8MA%3D%3D",
        price: 6000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Fabric sofa",
        img:"https://plus.unsplash.com/premium_photo-1673548917423-073963e7afc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFicmljJTIwc29mYXxlbnwwfHwwfHx8MA%3D%3D",
        price: 3000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Fabric sofa",
        img:"https://images.unsplash.com/photo-1511401139252-f158d3209c17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFicmljJTIwc29mYXxlbnwwfHwwfHx8MA%3D%3D",
        price: 2000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Fabric sofa",
        img:"https://plus.unsplash.com/premium_photo-1681488484866-af8f282d59ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFicmljJTIwc29mYXxlbnwwfHwwfHx8MA%3D%3D",
        price: 6000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "L shaped sofa",
     img:"https://media.istockphoto.com/id/519467072/photo/l-shaped-sofa.jpg?s=612x612&w=0&k=20&c=qHMqHflt9ixfW9xTF6g_h7NhfBcReNS1SdRx0UGWQmQ=",
        price: 7000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "L shaped sofa",
     img:"https://media.istockphoto.com/id/2101306651/photo/l-shaped-sofa-modern-corner-sofa.jpg?s=612x612&w=0&k=20&c=Xe2bExpTuDGkhSHmnTJYo4CuJ0NyDuCYHjvvFeQPsaI=",
        price: 10000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "L shaped sofa",
     img:"https://media.istockphoto.com/id/1494776371/photo/l-shaped-sofa-modern-corner-sofa.jpg?s=612x612&w=0&k=20&c=7ry6gzKuYJzU6N1Ij0yoklVcF5SQzVWHUNJNxJVXY60=",
        price: 20000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "L shaped sofa",
     img:"https://media.istockphoto.com/id/1367383775/photo/l-shaped-sofa-modern-corner-furniture-green-corner-furniture.jpg?s=612x612&w=0&k=20&c=QvHfVvUeoe9ibqUPeC5YNq56jQs0PBnQmMP3WIwWoWo=",
        price: 11000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Chester field sofa",
        img:"https://media.istockphoto.com/id/643666448/photo/vintage-brown-leather-chesterfield-sofa-isolated-on-white.jpg?s=612x612&w=0&k=20&c=JgP4xyijUgo3WhUYcsXLQUCpNn-n1T3-jaHNZDQyoqQ=",
        price: 5000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Chester field sofa",
        img:"https://media.istockphoto.com/id/538389933/photo/sofa-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=dNWEQSQoX8_GcK5H0tVlx4p-mOeg9Waif7ZKijgNLAQ=",
        price: 30000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Chester field sofa",
        img:"https://media.istockphoto.com/id/1128257808/photo/stylish-living-room.jpg?s=612x612&w=0&k=20&c=50lGc4Rrdk2txpKlxqHBSLuG8PlGXQXSMbNsCvElS00=",
        price: 20000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Chester field sofa",
        img:"https://media.istockphoto.com/id/1422448263/photo/chesterfield-sofa-with-small-vintage-table.jpg?s=612x612&w=0&k=20&c=zU1pd3s3SEdKxHjtxr6JuzASWvoDAxLm0HArjp5jph0=",
        price: 11000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "3 Seater sofa",
        img:"https://media.istockphoto.com/id/1340943121/photo/front-view-of-grey-sofa.jpg?s=612x612&w=0&k=20&c=wiVxE7i1LP-QkUBLe0RXyKj1XRk_PTqLdJQn7yc128Y=",
        price: 11000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "3 Seater sofa",
        img:"https://media.istockphoto.com/id/1201907196/photo/three-seats-cozy-grey-sofa.jpg?s=612x612&w=0&k=20&c=Z1sHPCNZwN0YWV4kG2zqfZEB708Nzd3FqQKsvO3LEjs=",
        price: 20000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "3 Seater sofa",
        img:"https://media.istockphoto.com/id/812300522/photo/brown-leather-sofa.jpg?s=612x612&w=0&k=20&c=U7RKFt_GB0mtvlY8j-jczkeWZiTuPKG0U4zRg2h1i4c=",
        price: 24000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "3 Seater sofa",
        img:"https://media.istockphoto.com/id/1145631251/photo/sofa-bed-l-shape-photo-l-shaped-sofa-beds-home-design-gorgeous-sofa-bed-l-shape-cozy-l-shaped.jpg?s=612x612&w=0&k=20&c=DilnefB2usq128_lwbbLcFjYMuvTj4F7HwDPjTAiyL4=",
        price: 11000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Sofa cum bed",
        img:"https://media.istockphoto.com/id/1016998464/photo/sofa-cum-bed-in-living-room.jpg?s=612x612&w=0&k=20&c=fJ0A7KkOjL5wLt96QPrnjs6OfNLl1s9dVLefvdFU0hQ=",
        price: 21000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Sofa cum bed",
        img:"https://media.istockphoto.com/id/974812574/photo/sofa-cum-bed-in-living-room.jpg?s=612x612&w=0&k=20&c=mTjZjj_daqWHpkKnDPS3JCusaUsiKXxLz9yr3z3eBjQ=",
        price: 22000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Sofa cum bed",
        img:"https://media.istockphoto.com/id/918515708/photo/couch.webp?b=1&s=170667a&w=0&k=20&c=bCZfgv4ZO66V-StaA9fI8kQwDslnNxkynEM016le0Z8=",
        price: 30000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    },
    {
        name: "Sofa cum bed",
        img:"https://media.istockphoto.com/id/467828389/photo/sofa-bed-pulled-out-with-blanket-on-it.webp?b=1&s=170667a&w=0&k=20&c=NDz2vr1jhJOCZkypn5pRmqkEwTW9r4kn0UiZLi6NYi0=",
        price: 40000,
        desc: `GLOSTAD sofa has a simple design which is also comfortable with its thick seat, padded armrests and soft back cushions that sit firmly in place.

         The sofa's low weight makes it easy to move  in your current home or when moving to a new home.

         The slightly angled metal legs make the sofa stable, while giving it a personal expression.
        Designed so that you can quickly and easily assemble it with just 8 screws.

        Easy to bring home if you choose to do it on your own. The packaging is about 115 cm long, 65 cm wide and weighs just under 20 kg

        The design allows us to use the material more efficiently in production, which is good for the planet  and helps us give you a lower price.

        A sofa with small, neat dimensions which is easy to furnish with, even when space is limited.

        This cover is made from Knisa fabric in polyester, which is dope-dyed. Its a durable material which has a soft feel.

        Designer
        Ram manohar

        Country of Origin
        INDIA
       `
    }
    
   
]
async function seed() {
    await Product.insertMany(dummyQuotes)
    console.log("seeded")
}
module.exports = seed