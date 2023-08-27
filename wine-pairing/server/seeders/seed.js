const db = require('../config/connection');
const { User, Category, Wine, Search, Protein, Sauce, Pairing } = require('../models');
const userSeeds = require('./userSeeds.json');
// const thoughtSeeds = require('./thoughtSeeds.json');

db.once('open', async () => {
  try {

    await Category.deleteMany();
    
    const categories = await Category.insertMany([
      { name: 'Sparkling' },//0
      { name: 'Light-Bodied-White' },//1
      { name: 'Medium-Bodied-White' },//2
      { name: 'Full-Bodied-White' },//3
      { name: 'Aromatic' },//4
      { name: 'Rose' },//5
      { name: 'Light-Bodied-Red' },//6
      { name: 'Medium-Bodied-Red' },//7
      { name: 'Full-Bodied-Red' },//8
      { name: 'Dessert' }//9
    ]);

    console.log('categories seeded');

    
    await Protein.deleteMany();
  
    const proteins = await Protein.insertMany([
    
      { name: 'Mollusk', value:1 },
      { name: 'Fish', value:2 },
      { name: 'Shellfish', value:3 },
      { name: 'Chicken/Pork', value:4 },
      { name: 'Red Meat', value:5 },
      { name: 'Tofu/Seitan', value:6 },
      { name: 'Brassicas/ Beans', value:7 },
      { name: 'Mushrooms', value:8 },
  
    ]);

    console.log('proteins seeded');

    await Sauce.deleteMany();
  
    const sauces = await Sauce.insertMany([

      { name: 'Strong Marinade', value:1 },
      { name: 'Tomato Based', value:2 },
      { name: 'Diary Based', value:3 },
      { name: 'Herbs Based', value:4 },
      { name: 'Chilli', value:5 },
     
    ]);

    console.log('sauces seeded');

    await Pairing.deleteMany();
  
    const pairings = await Pairing.insertMany([
      {
        protein: proteins[0]._id,
        sauce: sauces[0]._id,
        category: [categories[2]._id, categories[3]._id, categories[4]._id, categories[5]._id]
      }, 
      {
        protein: proteins[0]._id,
        sauce: sauces[1]._id,
        category: [categories[4]._id, categories[5]._id,]
      }, 
      {
        protein: proteins[0]._id,
        sauce: sauces[2]._id,
        category: [categories[0]._id, categories[1]._id,categories[2]._id,]
      }, 
      {
        protein: proteins[0]._id,
        sauce: sauces[3]._id,
        category: [categories[2]._id, categories[3]._id,categories[4]._id,]
      }, 
      {
        protein: proteins[0]._id,
        sauce: sauces[4]._id,
        category: [categories[0]._id, categories[1]._id,categories[2]._id,categories[4]._id,]
      }, 
      {
        protein: proteins[1]._id,
        sauce: sauces[0]._id,
        category: [categories[2]._id, categories[3]._id,categories[4]._id]
      }, 
      {
        protein: proteins[1]._id,
        sauce: sauces[1]._id,
        category: [categories[3]._id, categories[5]._id,categories[6]._id]
      }, 
      {
        protein: proteins[1]._id,
        sauce: sauces[2]._id,
        category: [categories[0]._id, categories[1]._id,categories[2]._id,categories[4]._id ]
      }, 
      {
        protein: proteins[1]._id,
        sauce: sauces[3]._id,
        category: [categories[0]._id, categories[1]._id,categories[2]._id,categories[4]._id ]
      }, 
      {
        protein: proteins[1]._id,
        sauce: sauces[4]._id,
        category: [categories[0]._id, categories[1]._id,categories[2]._id,categories[4]._id, categories[5]._id ]
      },
      {
        protein: proteins[2]._id,
        sauce: sauces[0]._id,
        category: [categories[2]._id, categories[3]._id,categories[4]._id,categories[5]._id]
      }, 
      {
        protein: proteins[2]._id,
        sauce: sauces[1]._id,
        category: [categories[2]._id, categories[3]._id,categories[4]._id,categories[5]._id]
      }, 
      {
        protein: proteins[2]._id,
        sauce: sauces[2]._id,
        category: [categories[0]._id, categories[1]._id,categories[2]._id,categories[4]._id]
      }, 
      {
        protein: proteins[2]._id,
        sauce: sauces[3]._id,
        category: [categories[1]._id, categories[2]._id,categories[4]._id]
      }, 
      {
        protein: proteins[2]._id,
        sauce: sauces[4]._id,
        category: [categories[1]._id, categories[2]._id,categories[4]._id,]
      }, 
      {
        protein: proteins[3]._id,
        sauce: sauces[0]._id,
        category: [categories[4]._id, categories[5]._id,categories[6]._id]
      }, 
      {
        protein: proteins[3]._id,
        sauce: sauces[1]._id,
        category: [categories[4]._id, categories[5]._id,categories[6]._id, categories[7]._id ]
      }, 
      {
        protein: proteins[3]._id,
        sauce: sauces[2]._id,
        category: [categories[1]._id, categories[2]._id,categories[3]._id, categories[4]._id ]
      }, 
      {
        protein: proteins[3]._id,
        sauce: sauces[3]._id,
        category: [categories[4]._id, categories[5]._id,categories[6]._id ]
      }, 
      {
        protein: proteins[3]._id,
        sauce: sauces[4]._id,
        category: [categories[4]._id, categories[5]._id,categories[6]._id ]
      }, 
      {
        protein: proteins[4]._id,
        sauce: sauces[0]._id,
        category: [categories[7]._id, categories[8]._id ]
      }, 
      {
        protein: proteins[4]._id,
        sauce: sauces[1]._id,
        category: [categories[6]._id, categories[7]._id,categories[8]._id ]
      },
      {
        protein: proteins[4]._id,
        sauce: sauces[2]._id,
        category: [categories[6]._id, categories[7]._id,categories[8]._id ]
      }, 
      {
        protein: proteins[4]._id,
        sauce: sauces[3]._id,
        category: [categories[6]._id, categories[7]._id,categories[8]._id ]
      },
      {
        protein: proteins[4]._id,
        sauce: sauces[4]._id,
        category: [categories[5]._id,categories[6]._id, categories[7]._id,categories[8]._id ]
      },
      {
        protein: proteins[5]._id,
        sauce: sauces[0]._id,
        category: [categories[2]._id,categories[3]._id, categories[5]._id,categories[6]._id ]
      },
      {
        protein: proteins[5]._id,
        sauce: sauces[1]._id,
        category: [categories[4]._id,categories[5]._id, categories[6]._id ]
      },
      {
        protein: proteins[5]._id,
        sauce: sauces[2]._id,
        category: [categories[3]._id,categories[4]._id, categories[5]._id,categories[6]._id ]
      },
      {
        protein: proteins[5]._id,
        sauce: sauces[3]._id,
        category: [categories[1]._id,categories[4]._id, categories[5]._id]
      },
      {
        protein: proteins[5]._id,
        sauce: sauces[4]._id,
        category: [categories[4]._id,categories[5]._id, categories[6]._id ]
      },
      {
        protein: proteins[6]._id,
        sauce: sauces[0]._id,
        category: [categories[2]._id,categories[5]._id]
      },
      {
        protein: proteins[6]._id,
        sauce: sauces[1]._id,
        category: [categories[6]._id, categories[7]._id ]
      },
      {
        protein: proteins[6]._id,
        sauce: sauces[2]._id,
        category: [categories[4]._id, categories[5]._id,categories[6]._id ]
      },
      {
        protein: proteins[6]._id,
        sauce: sauces[3]._id,
        category: [categories[5]._id,categories[6]._id ]
      },
      {
        protein: proteins[6]._id,
        sauce: sauces[4]._id,
        category: [categories[6]._id ]
      },
      {
        protein: proteins[7]._id,
        sauce: sauces[0]._id,
        category: [categories[4]._id,categories[6]._id ]
      },
      {
        protein: proteins[7]._id,
        sauce: sauces[1]._id,
        category: [categories[5]._id,categories[6]._id, categories[7]._id ]
      },
      {
        protein: proteins[7]._id,
        sauce: sauces[2]._id,
        category: [categories[6]._id,categories[7]._id]
      },
      {
        protein: proteins[7]._id,
        sauce: sauces[3]._id,
        category: [categories[6]._id, categories[7]._id ]
      },
      {
        protein: proteins[7]._id,
        sauce: sauces[4]._id,
        category: [categories[6]._id, categories[7]._id ]
      }
    ]);

    console.log('pairings seeded');

    await User.deleteMany();

    await User.create(userSeeds);
    console.log('users seeded');

    await Wine.deleteMany();

    const wines = await Wine.insertMany([
      {
        name:"R de Ruinart Brut",
        vintage:"NV",
        varietal:"Chardonnay, Pinot Noir, Pinot Meunier",
        region:"Champagne, FRA",
        image:"https://images.vivino.com/thumbs/OtiVflrBQWiLs0TGB3vlbg_pb_x600.png",
        tastingNote:"Ruinart Brut sparkles in chestnuts, yellows and golds. First impressions reveal subtle fruity notes of reinette apples and apricots, along with fresh almonds and hazelnuts. Hints of elderflower and coriander seed add a touch of complexity. Second impressions create room for intense aromas of brioche and biscuit. Sweet notes of golden fruit, plum tarts and ripe drupes develop in the mouth. The palate is enveloped in harmonious and persistent roundness. The finale reveals the distinctive freshness of chardonnay.",
        category:categories[0]._id,
        price: 124.99,
        quantity: 500
      },
      {
        name:"Pol Roger Brut",
        vintage:"NV",
        varietal:"Chardonnay, Pinot Noir, Pinot Meunier",
        region:"Champagne, FRA",
        image:"https://user-images.githubusercontent.com/122245852/260718774-d4d8b34a-af56-4a4c-a591-c8634466a1fd.jpeg",
        tastingNote:"Pol Roger Brut Réserve diplays a beautiful golden straw coloured  hue, as well as abundant and fine bubbles. With a powerful and attractive nose, it first delivers aromas of fruit (pear, mango ...) and then releases light flavours of honeysuckle and white jasmine, lingering on vanilla and brioche notes. Behind a frank and dynamic attack, the wine encompasses a nice harmony and a pleasant freshness, whilst preserving some structure. On the palate, flavours of cooked fruit (quince jelly, apricot jam) happily mingle with fragrances of beeswax and acacia honey. The long-lasting aromas, composed of both fruity (candied orange peel, tangerine...) and spicy notes (cardamom, anis) is outstanding.",
        category:categories[0]._id,
        price: 84.99,
        quantity: 500
      },
      {
        name:"Domaine VACHERON Sancerre Blanc AOC",
        vintage:"2022",
        varietal:"Sauvignon Blanc",
        region:"Sancerre, FRA",
        image: 'https://jimscellars.com.au/cdn/shop/products/Sancerre-Blanc-Domaine-Vacheron-white-wine_1024x1024.jpg?v=1530665115',
        tastingNote:"Pleasant fruity and floral aromas. It has mineral touches, a good tension and an enveloping volume.",
        category:categories[1]._id,
        price: 60.99,
        quantity: 30
      },
      {
        name:"By Farr Viognier",
        vintage:"2021",
        varietal:"Viognier",
        region:"Vic, AUS",
        image:"https://wineexperience.com.au/images/products/By-Farr-Viognier_1561694486-200.jpg",
        tastingNote:"A lovely perfumed, yet subtle expression of viognier. Fresh peach and apricot flavours as a young wine, which we believe will intensify over time. The palate is restrained, luscious and shows a ginger-flavoured freshness with underlying power and lingering aftertaste. This wine benefits beautifully from 12 months of bottle ageing, as the acid softens.",
        category:categories[1]._id,
        price: 119.99,
        quantity: 50
      },
      {
        name:"William Fevre Chablis",
        vintage:"2021",
        varietal:"Chardonnay",
        region:"Chablis, FRA",
        image:"https://s3-eu-west-1.amazonaws.com/bpfbdd/O3NKXf7xbg/b37bd662d8d49fd5931d5946d32422a7507ea445-thumb.png",
        tastingNote:"Fleshy and elegant bouquet revealing citrus, white fruits and flowers aromas. The mouth is fresh, supple underscored by mineral.",
        category:categories[2]._id,
        price: 32.99,
        quantity: 500
      },
      {
        name:"Ossa Grüner Veltliner",
        vintage:"2022",
        varietal:"Grüner Veltliner",
        region:"Tas, AUS",
        image:"https://ossa.wine/wp-content/uploads/2021/11/OSSA_Bottle_Shots_Nov_2021_Shoot-1-scaled.jpg",
        tastingNote:"Immediately enticing notes of fresh fennel, white stone fruit and lime curd, underlined by classic nuances of savoury white pepper. The palate is taught, and textural. Oak fermentation provides layers of baking spice and fresh almond notes, with lingering flavours reminiscent of meyer lemon and winter pear.",
        category:categories[2]._id,
        price: 59.99,
        quantity: 100
      },
      {
        name:"Tony Bish Heartwood Chardonnay",
        vintage:"2021",
        varietal:"Chardonnay",
        region:"Hawkes Bay, NZ",
        image:"https://tonybishwines.co.nz/cdn/shop/products/skeetfield_2021_large.png?v=1664513725",
        tastingNote:"The aroma is pure and intense with peach, sweet citrus notes, nutty complexity and lifted vanilla. Complex and enticing. These aromas flow onto the palate which is weighty, rich and pure with defined varietal expression, barrel ferment complexity, and a sustained citrus finish. The French oak and fruit are beautifully balanced. Will cellar well for at least 5 years.",
        category:categories[3]._id,
        price: 80.99,
        quantity: 10
      },
      {
        name:"Ten Minutes by Tractor - Wallis Chardonnay",
        vintage:"2019",
        varietal:"Chardonnay",
        region:"Vic, AUS",
        image:"https://www.tenminutesbytractor.com.au/assets/images/products/pictures/2021WallisChardonnay-EPUOGV.jpg",
        tastingNote:"Flinty upfront, this well-rounded Wallis has ripe citrus, lemon curd, hints of almond, fresh mandarin and green mango traversing the palate. The fruit is sweet and balanced and continues to linger as the mineral acid drives through and defines the finish.",
        category:categories[3]._id,
        price: 70.99,
        quantity: 100
      },
      {
        name:"Peregrine Pinot Gris",
        vintage:"2022",
        varietal:"Pinot Gris",
        region:"Central Otago, NZ",
        image:"https://cdn.shopify.com/s/files/1/2170/1977/products/peregrine-pinot-gris_923205de-0f38-4b66-a0db-5b4c48494b5d.png?v=1675629241",
        tastingNote:"Enticing aromatics of hazelnut, nutmeg, pear and white peach compliment an elegant and soft palate with fine texture and layers of grapefruit zest, ginger spice and Central Otago stonefruit.",
        category:categories[4]._id,
        price: 23.00,
        quantity: 100
      },
      {
        name:"Museum Release Isolation Ridge Vineyard Riesling",
        vintage:"2013",
        varietal:"Riesling",
        region:"WA, AUS",
        image:"https://fusws.api.aspedia.io/franklandestate-website/Wine%20Bottles/FE%20Isolation%20Reisling%201400x459px.png?preset=wineproductdetails&t=1684122380404",
        tastingNote:"Bright, pristine, undeveloped herbal and lemon juice aromas. The taste is fresh and light, crisp and young, and just a little straightforward at this stage, but it will age and build superbly. Lean, tangy, and intense. Clean citrus flavours; very pure. Lively acidity; clean finish. It's a baby and needs time.",
        category:categories[4]._id,
        price: 100.00,
        quantity: 12
      },
      {
        name:"Two Paddocks Pinot Rose",
        vintage:"2022",
        varietal:"Pinot Noir",
        region:"Central Otago, NZ",
        image:"https://www.twopaddocks.com/wp-content/uploads/2023/06/two-paddocks-rose-generic-resized6-1684716941639-1.jpg",
        tastingNote:"Crushed strawberry colour but finishing bone dry. Dark redcurrant, wild herb, greengage and plum aromatics lead to a rich warmly textured mouthfeel showing great density, drive and length.",
        category:categories[5]._id,
        price: 33.00,
        quantity: 100
      },
      {
        name:"Domaine La Suffrene Bandol Rosé",
        vintage:"2021",
        varietal:"Mourvedre, Cinsault, Grenache and Carignan",
        region:"Bandol, FRA",
        image:"https://bilder.vinmonopolet.no/cache/1200x1200-0/1010201-1.jpg",
        tastingNote:"The art of Rosé is the art of understatement, the art of creating a drinkability so complete that it almost contrives to efface its own origins. Almost. Yet it's a mark of the greatness of this rosé that those origins do linger - namely the distinguished clay-marl terraces of Bandol, and the contentment of the Mourvedre which so relishes growing there. This is a deeper salmon than many of its peers, with scintillatingly peachy-floral fruits. The origins come through most clearly in the palate, with its sustained shaping structure from those contented Mourvedre vines. The Grenache, meanwhile, has brought wealth and fleshy Cinsault charm. It adds up to an irresistible whole.",
        category:categories[5]._id,
        price: 23.00,
        quantity: 100
      },
      {
        name:"Chard Farm Mata-au Pinot Noir",
        vintage:"2021",
        varietal:"Pinot Noir",
        region:"Central Otago, NZ",
        image:"https://images.vivino.com/thumbs/vhzz7jFXSaWjJli28hv_Tg_pb_x960.png",
        tastingNote:"The bouquet becomes increasingly attractive as it shifts through ripe red berries, sweet floral tones, darker spicy notes and herby complexity. The fresh red fruits, spice, and later wild herb flavours hold a wonderfully harmonious shape and texture, nicely supported with fine persistent tannins and calm acidity.",
        category:categories[6]._id,
        price: 140.00,
        quantity: 100
      },
      {
        name:"Rusden Christines Vineyard Grenache",
        vintage:"2021",
        varietal:"Grenache",
        region:"SA, AUS",
        image:"https://images.vivino.com/thumbs/UrDYoN5sS1GNQ5ZZQVeJkQ_pb_x600.png",
        tastingNote:"Bright, red fruited with raspberry & cherry aromas, some red liquorice/spice here too! The palate falls right into the medium bodied territory, red fruits and spice with a noticeable chinotto character. Lovely finish with tight firm tannins balanced by acidity. Beautiful, a standout vintage!",
        category:categories[6]._id,
        price: 40.00,
        quantity: 400
      },
      {
        name:"Moric burgenland Blaufrankish",
        vintage:"2019",
        varietal:"Blaufrankish",
        region:"Burgenland, Austria",
        image:"https://www.weingrube.com/produkt/blaufraenkisch-burgenland-2017-g3544.jpg",
        tastingNote:"Roland Velich, winemaker extraordinaire behind the Moric project, appreciates the long forgotten great sites in the southern stretches of the Burgenland region - especially those planted with Blaufrankisch over 100 years ago. Made with techniques seen more in Burgundy than Austria, this project is responsible for some of the most exciting red wine in Austria today. Bright and crunchy - red berry compote and cranberry flavours abound, but with a serious savoury edge of graphite and minerality.",
        category:categories[7]._id,
        price: 43.00,
        quantity: 10
      },
      {
        name:"Te Mata Estate Bullnose Syrah",
        vintage:"2018",
        varietal:"Syrah",
        region:"Hawkes Bay, NZ",
        image:"https://images.vivino.com/thumbs/w2yjrYctTJ2XiyqOy468DQ_pb_x960.png",
        tastingNote:"The gorgeously perfumed bouquet shows Black Doris plum, sweet raspberry, violet, olive and toasted almond characters with a whiff of fragrant spice. The palate is concentrated, focused and delightfully flowing with outstanding depth and intensity, while remaining elegant and poised, leading to an extremely long expansive finish. Harmonious, seamless and flawlessly precise. Combining exquisite refinement and undeniable power, this latest offering is another stunning beauty under this iconic label",
        category:categories[7]._id,
        price: 63.00,
        quantity: 100
      },
      {
        name:"Jim Barry Single Vineyard The Farm Cabernet Malbec",
        vintage:"2018",
        varietal:"Cabernet Malbec",
        region:"Clare Valley, AUS",
        image:"https://fusws.api.aspedia.io/jimbarry-website/Single%20Vineyard%20The%20Farm%20Cabernet%20Malbec%20NV.png?preset=wineproductdetails&t=1623118781139",
        tastingNote:"Aroma: Lifted aromas of violet florals with dark berry fruits and a lick of oak spice, create a tantilising bouquet on the nose. Palate: A very structural wine offering flavours of bright blueberry and mulberry fruits with black olive savoury notes. Fresh cherry and plum characters are provided by the addition of Malbec in this superb blend. This is a wine of great length, with well integrated savoury tannins.",
        category:categories[8]._id,
        price: 30.00,
        quantity: 100
      },
      {
        name:"Yalumba FDR1A Cabernet Sauvignon & Shiraz",
        vintage:"2016",
        varietal:"Cabernet Sauvignon, Shiraz",
        region:"SA, AUS",
        image:"https://web-assets-prod.yalumba.com/_productLarge/DistinguishedSites-FDR1ACabSavShiraz-8Bit-Final.png",
        tastingNote:"Deep crimson red in colour. Cedar fragrances and blue fruits are joined by complex earthy tones, lots of blackberry, blackcurrant and chocolate. An elegant and generously flavoured wine that is succulent with a rich core of dark berries and smooth chocolate coated tannins.",
        category:categories[8]._id,
        price: 50.00,
        quantity: 200
      },
      {
        name:"Framingham Noble Riesling",
        vintage:"2022",
        varietal:"Riesling",
        region:"Marlborough, NZ",
        image:"https://framingham.co.nz/cdn/shop/products/Noble_1e23bd6f-0866-4b27-bacd-890e0641e516_1512x.jpg?v=1668048923",
        tastingNote:"Big, syrupy and concentrated dessert riesling in a beerenauslese style with honey, honeycomb, and exotic tropical fruit flavours supported by assertive natural acidity. Very strong botrytis influence",
        category:categories[9]._id,
        price: 53.00,
        quantity: 100
      },
      {
        name:"Prophets Rock Vin de Paille",
        vintage:"2020",
        varietal:"Pinot Gris",
        region:"Central Otago, NZ",
        image:"https://www.prophetsrock.co.nz/wp-content/uploads/2021/11/prophets-rock_0006_vin-de-paille-1627853666474.png.png",
        tastingNote:"Delicious sweet wine with purity and complexity. Quite floral with a backbone of bright acidity. Very impressive.",
        category:categories[9]._id,
        price: 100.00,
        quantity: 100
      },
    ]);
  
    console.log('wines seeded');
  

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
  
});
