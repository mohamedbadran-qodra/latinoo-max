/* ==========================================================================
   LATINOO MAX — Data layer
   --------------------------------------------------------------------------
   Single source of truth for all dynamic content. The public site and the
   admin dashboard NEVER hardcode products, prices, offers or content —
   everything is read through the DB object below.

   SEED DATA IS GENERATED FROM THE REAL MENU:
   source: user's Excel file (latinoo_menu-cd71986a.xlsx, 494 rows).
   Arabic names + EGP prices are exact from the file; English names are
   translations. Regenerate with /tmp/gen_seed.py if the menu changes.
   (Generator kept out of the repo; the generated data lives below.)

   Storage: localStorage (key LATINOO_DB_KEY). On first visit the database
   is seeded from SEED. To swap in a real backend later, replace the
   load/save internals of DB with API calls — the public API stays the same.
   ========================================================================== */

(function (global) {
  'use strict';

  var DB_KEY = 'latinoo_db_v1';
  var CART_KEY = 'latinoo_cart_v1';
  var LANG_KEY = 'latinoo_lang_v1';

  /* ------------------------------------------------------------------ */
  /* SEED DATA — generated from the real Excel menu (see header note)   */
  /* ------------------------------------------------------------------ */

  var SEED = {
  "version": 2,
  "categories": [
    {
      "id": "cat-01",
      "order": 1,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Milkshakes",
        "ar": "ميلك شيك"
      },
      "desc": {
        "en": "Thick, creamy milkshakes blended fresh",
        "ar": "ميلك شيك سميك وكريمي يُحضَّر طازجاً"
      }
    },
    {
      "id": "cat-02",
      "order": 2,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Tacos",
        "ar": "التاكو"
      },
      "desc": {
        "en": "Bold Latin tacos, made to order",
        "ar": "تاكو بنكهات لاتينية جريئة يُحضَّر عند الطلب"
      }
    },
    {
      "id": "cat-03",
      "order": 3,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Smoothies",
        "ar": "سموزى"
      },
      "desc": {
        "en": "Fresh fruit smoothies, blended to order",
        "ar": "سموزي فواكه طازجة يُحضَّر عند الطلب"
      }
    },
    {
      "id": "cat-04",
      "order": 4,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Ramadan Juices",
        "ar": "عصائر رمضان"
      },
      "desc": {
        "en": "Traditional Ramadan juices, freshly made",
        "ar": "عصائر رمضان التقليدية طازجة"
      }
    },
    {
      "id": "cat-05",
      "order": 5,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Soft Drinks",
        "ar": "مشروبات غازية"
      },
      "desc": {
        "en": "Chilled soft drinks & sodas",
        "ar": "مشروبات غازية مثلجة"
      }
    },
    {
      "id": "cat-06",
      "order": 6,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Meat Sandwiches",
        "ar": "سندوتش اللحوم"
      },
      "desc": {
        "en": "Hearty meat sandwiches, grilled fresh",
        "ar": "ساندويتشات لحوم مشوية طازجة"
      }
    },
    {
      "id": "cat-07",
      "order": 7,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Pasta",
        "ar": "الباستا"
      },
      "desc": {
        "en": "Italian pasta with rich, slow-made sauces",
        "ar": "باستا إيطالية بصلصات غنية"
      }
    },
    {
      "id": "cat-08",
      "order": 8,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Chicken Meals",
        "ar": "وجبات الدجاج"
      },
      "desc": {
        "en": "Signature chicken meals, served complete",
        "ar": "وجبات دجاج مميزة متكاملة"
      }
    },
    {
      "id": "cat-09",
      "order": 9,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Crepes",
        "ar": "الكريب"
      },
      "desc": {
        "en": "Fresh crepes with savoury fillings",
        "ar": "كريب طازج بحشوات شهية"
      }
    },
    {
      "id": "cat-10",
      "order": 10,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Meat Meals",
        "ar": "وجبات اللحوم"
      },
      "desc": {
        "en": "Premium meat meals & steaks",
        "ar": "وجبات لحوم وستيك فاخرة"
      }
    },
    {
      "id": "cat-11",
      "order": 11,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Cakes & Biscuits",
        "ar": "الكعك والبسكويت"
      },
      "desc": {
        "en": "Homemade kahk & biscuits",
        "ar": "كحك وبسكويت منزلي"
      }
    },
    {
      "id": "cat-12",
      "order": 12,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Burgers",
        "ar": "البرجر"
      },
      "desc": {
        "en": "Flame-grilled burgers, signature sauces",
        "ar": "برجر مشوي على اللهب بصلصات مميزة"
      }
    },
    {
      "id": "cat-13",
      "order": 13,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Desserts",
        "ar": "الحلو"
      },
      "desc": {
        "en": "Cakes & sweets, made in-house daily",
        "ar": "حلويات تُصنع طازجة يومياً"
      }
    },
    {
      "id": "cat-14",
      "order": 14,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Salads",
        "ar": "سلاطات"
      },
      "desc": {
        "en": "Fresh salads & dips",
        "ar": "سلطات وصوصات طازجة"
      }
    },
    {
      "id": "cat-15",
      "order": 15,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Hot Drinks",
        "ar": "المشروبات الساخنه"
      },
      "desc": {
        "en": "Coffee, tea & hot chocolate, brewed fresh",
        "ar": "قهوة وشاي وشوكولاتة ساخنة طازجة"
      }
    },
    {
      "id": "cat-16",
      "order": 16,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Appetizers",
        "ar": "مقبلات"
      },
      "desc": {
        "en": "Starters, fries & finger food",
        "ar": "مقبلات وبطاطس وأكلات خفيفة"
      }
    },
    {
      "id": "cat-17",
      "order": 17,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Seafood Sandwiches",
        "ar": "سندوتش سي فوود"
      },
      "desc": {
        "en": "Fresh seafood sandwiches",
        "ar": "ساندويتشات سي فوود طازجة"
      }
    },
    {
      "id": "cat-18",
      "order": 18,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Soups",
        "ar": "الشوربة"
      },
      "desc": {
        "en": "Warm, creamy soups",
        "ar": "شوربات دافئة وكريمية"
      }
    },
    {
      "id": "cat-19",
      "order": 19,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Chicken Sandwiches",
        "ar": "سندوتش الدجاج"
      },
      "desc": {
        "en": "Crispy & grilled chicken sandwiches",
        "ar": "ساندويتشات دجاج مقرمشة ومشوية"
      }
    },
    {
      "id": "cat-20",
      "order": 20,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Medium Pizza",
        "ar": "بيتزا وسط"
      },
      "desc": {
        "en": "Wood-fired medium pizza, fresh dough daily",
        "ar": "بيتزا وسط على الحطب بعجينة طازجة يومياً"
      }
    },
    {
      "id": "cat-21",
      "order": 21,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Large Pizza",
        "ar": "بيتزا كبير"
      },
      "desc": {
        "en": "Wood-fired large pizza, made for sharing",
        "ar": "بيتزا كبيرة على الحطب للمشاركة"
      }
    },
    {
      "id": "cat-22",
      "order": 22,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Iced Coffee",
        "ar": "القهوه المثلجه"
      },
      "desc": {
        "en": "Iced lattes & cold coffee",
        "ar": "قهوة مثلجة ولاتيه بارد"
      }
    },
    {
      "id": "cat-23",
      "order": 23,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Waffles",
        "ar": "الوافل"
      },
      "desc": {
        "en": "Golden waffles with your favourite toppings",
        "ar": "وافل ذهبي بإضافاتك المفضلة"
      }
    },
    {
      "id": "cat-24",
      "order": 24,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Yogurt",
        "ar": "الزبادي"
      },
      "desc": {
        "en": "Fresh fruit yogurt",
        "ar": "زبادي فواكه طازج"
      }
    },
    {
      "id": "cat-25",
      "order": 25,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Smoothie Mixes",
        "ar": "ميكسات سموزي"
      },
      "desc": {
        "en": "Signature smoothie blends",
        "ar": "خلطات سموزي مميزة"
      }
    },
    {
      "id": "cat-26",
      "order": 26,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Frappé",
        "ar": "فراابيه"
      },
      "desc": {
        "en": "Blended iced frappé, coffee & more",
        "ar": "فرابيه مثلج بالقهوة وغيرها"
      }
    },
    {
      "id": "cat-27",
      "order": 27,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Juices",
        "ar": "العصائر"
      },
      "desc": {
        "en": "Freshly squeezed juices",
        "ar": "عصائر طازجة معصورة"
      }
    },
    {
      "id": "cat-28",
      "order": 28,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Cocktails",
        "ar": "الكوكتيلات"
      },
      "desc": {
        "en": "Fresh fruit cocktails",
        "ar": "كوكتيلات فواكه طازجة"
      }
    },
    {
      "id": "cat-29",
      "order": 29,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Yogurt Mixes",
        "ar": "ميكسات زبادي"
      },
      "desc": {
        "en": "Yogurt blended with fresh fruit",
        "ar": "زبادي مخلوط بفواكه طازجة"
      }
    },
    {
      "id": "cat-30",
      "order": 30,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Ice Cream",
        "ar": "الايس كريم"
      },
      "desc": {
        "en": "Scoops & sundaes, made to enjoy",
        "ar": "آيس كريم وصنداي لذيذ"
      }
    },
    {
      "id": "cat-31",
      "order": 31,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Ice Cream Tarts",
        "ar": "ايس كريم تارتات"
      },
      "desc": {
        "en": "Celebration ice-cream tarts",
        "ar": "تارتات آيس كريم للمناسبات"
      }
    },
    {
      "id": "cat-32",
      "order": 32,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Latino Sizzlers",
        "ar": "اطباق لاتينو المشتعله"
      },
      "desc": {
        "en": "Sizzling fajitas & signature plates",
        "ar": "فاهيتا مشتعلة وأطباق مميزة"
      }
    },
    {
      "id": "cat-33",
      "order": 33,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Latino Grill",
        "ar": "لاتينو جريل"
      },
      "desc": {
        "en": "From the Latinoo grill",
        "ar": "من مشويات لاتينو"
      }
    },
    {
      "id": "cat-34",
      "order": 34,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Ramadan Meals",
        "ar": "وجبات الرمضانيه"
      },
      "desc": {
        "en": "Special Ramadan meals",
        "ar": "وجبات رمضانية خاصة"
      }
    },
    {
      "id": "cat-35",
      "order": 35,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Suhoor",
        "ar": "السحور"
      },
      "desc": {
        "en": "Suhoor meals, served late",
        "ar": "وجبات سحور تُقدَّم ليلاً"
      }
    },
    {
      "id": "cat-36",
      "order": 36,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Latino Fried Chicken",
        "ar": "لاتينو فراي تشيكن"
      },
      "desc": {
        "en": "Golden, crispy fried chicken",
        "ar": "دجاج مقلي ذهبي مقرمش"
      }
    },
    {
      "id": "cat-37",
      "order": 37,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Hot Matcha",
        "ar": "هوت ماتشا"
      },
      "desc": {
        "en": "Warm matcha lattes",
        "ar": "لاتيه ماتشا ساخن"
      }
    },
    {
      "id": "cat-38",
      "order": 38,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Iced Matcha",
        "ar": "ايس ماتشا"
      },
      "desc": {
        "en": "Iced matcha creations",
        "ar": "ماتشا مثلجة مبتكرة"
      }
    },
    {
      "id": "cat-39",
      "order": 39,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Pizza",
        "ar": "البيتزا"
      },
      "desc": {
        "en": "Wood-fired pizza, fresh dough daily",
        "ar": "بيتزا على الحطب بعجينة طازجة يومياً"
      }
    },
    {
      "id": "cat-40",
      "order": 40,
      "visible": true,
      "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
      "name": {
        "en": "Combos",
        "ar": "الكومبو"
      },
      "desc": {
        "en": "Value combos, made to share",
        "ar": "كومبو بقيمة مميزة للمشاركة"
      }
    }
  ],
  "products": [
    {
      "id": "p-0001",
      "categoryId": "cat-01",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Banana Milkshake",
        "ar": "ميلك شيك موز"
      },
      "desc": {
        "en": "Freshly made Banana Milkshake, blended to order — the perfect refreshment.",
        "ar": "ميلك شيك موز طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0002",
      "categoryId": "cat-01",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mocha Milkshake",
        "ar": "ميلك شيك موكا"
      },
      "desc": {
        "en": "Mocha Milkshake, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ميلك شيك موكا يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0003",
      "categoryId": "cat-01",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Berry Yogurt Milkshake",
        "ar": "ميلك شيك زبادي توت"
      },
      "desc": {
        "en": "Freshly made Berry Yogurt Milkshake, blended to order — the perfect refreshment.",
        "ar": "ميلك شيك زبادي توت طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0004",
      "categoryId": "cat-01",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cheesecake Milkshake",
        "ar": "ميلك شيك تشيز كيك"
      },
      "desc": {
        "en": "Cheesecake Milkshake, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ميلك شيك تشيز كيك يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0005",
      "categoryId": "cat-01",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Wild Berries Milkshake",
        "ar": "ميلك شيك فواكهه بريه"
      },
      "desc": {
        "en": "Freshly made Wild Berries Milkshake, blended to order — the perfect refreshment.",
        "ar": "ميلك شيك فواكهه بريه طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0006",
      "categoryId": "cat-01",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Nutella / Nutella Oreo Milkshake",
        "ar": "ميلك شيك نوتيلا / نوتيلا اوريو"
      },
      "desc": {
        "en": "Nutella / Nutella Oreo Milkshake, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ميلك شيك نوتيلا / نوتيلا اوريو يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0007",
      "categoryId": "cat-01",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Vanilla Oreo Milkshake",
        "ar": "ميلك شيك فانيليا اوريو"
      },
      "desc": {
        "en": "Freshly made Vanilla Oreo Milkshake, blended to order — the perfect refreshment.",
        "ar": "ميلك شيك فانيليا اوريو طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0008",
      "categoryId": "cat-01",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Lotus Milkshake",
        "ar": "ميلك شيك لوتس"
      },
      "desc": {
        "en": "Lotus Milkshake, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ميلك شيك لوتس يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0009",
      "categoryId": "cat-01",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Oreo Milkshake",
        "ar": "ميلك شيك اوريو"
      },
      "desc": {
        "en": "Freshly made Oreo Milkshake, blended to order — the perfect refreshment.",
        "ar": "ميلك شيك اوريو طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0010",
      "categoryId": "cat-01",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Red Berry Milkshake",
        "ar": "ميلك شيك توت احمر"
      },
      "desc": {
        "en": "Red Berry Milkshake, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ميلك شيك توت احمر يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0011",
      "categoryId": "cat-01",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chocolate Milkshake",
        "ar": "ميلك شيك شوكليت"
      },
      "desc": {
        "en": "Freshly made Chocolate Milkshake, blended to order — the perfect refreshment.",
        "ar": "ميلك شيك شوكليت طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0012",
      "categoryId": "cat-01",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Strawberry Milkshake",
        "ar": "ميلك شيك فراولة"
      },
      "desc": {
        "en": "Strawberry Milkshake, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ميلك شيك فراولة يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0013",
      "categoryId": "cat-01",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Vanilla Milkshake",
        "ar": "ميلك شيك فانيليا"
      },
      "desc": {
        "en": "Freshly made Vanilla Milkshake, blended to order — the perfect refreshment.",
        "ar": "ميلك شيك فانيليا طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0014",
      "categoryId": "cat-01",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Blueberry Milkshake",
        "ar": "ميلك شيك توت ازرق"
      },
      "desc": {
        "en": "Blueberry Milkshake, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ميلك شيك توت ازرق يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0015",
      "categoryId": "cat-01",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mango Milkshake",
        "ar": "ميلك شيك مانجو شيك"
      },
      "desc": {
        "en": "Freshly made Mango Milkshake, blended to order — the perfect refreshment.",
        "ar": "ميلك شيك مانجو شيك طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0016",
      "categoryId": "cat-01",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Caramel Milkshake",
        "ar": "ميلك شيك كراميل"
      },
      "desc": {
        "en": "Caramel Milkshake, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ميلك شيك كراميل يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0017",
      "categoryId": "cat-01",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Kinder Milkshake",
        "ar": "ميلك شيك كيندر"
      },
      "desc": {
        "en": "Freshly made Kinder Milkshake, blended to order — the perfect refreshment.",
        "ar": "ميلك شيك كيندر طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0018",
      "categoryId": "cat-01",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Passion Fruit Milkshake",
        "ar": "ميلك شيك باشون فروت"
      },
      "desc": {
        "en": "Passion Fruit Milkshake, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ميلك شيك باشون فروت يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0019",
      "categoryId": "cat-01",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Galaxy Milkshake",
        "ar": "ميلك شيك جلاكسي"
      },
      "desc": {
        "en": "Freshly made Galaxy Milkshake, blended to order — the perfect refreshment.",
        "ar": "ميلك شيك جلاكسي طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0020",
      "categoryId": "cat-01",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "KitKat Milkshake",
        "ar": "ميلك شيك كت كات"
      },
      "desc": {
        "en": "KitKat Milkshake, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ميلك شيك كت كات يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0021",
      "categoryId": "cat-01",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Snickers Milkshake",
        "ar": "ميلك شيك اسنيكرز"
      },
      "desc": {
        "en": "Freshly made Snickers Milkshake, blended to order — the perfect refreshment.",
        "ar": "ميلك شيك اسنيكرز طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0022",
      "categoryId": "cat-01",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mango Milkshake",
        "ar": "ميلك شيك مانجو"
      },
      "desc": {
        "en": "Mango Milkshake, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ميلك شيك مانجو يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0023",
      "categoryId": "cat-01",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Coffee Espresso Milkshake",
        "ar": "ميلك شيك كوفي اسبرسو"
      },
      "desc": {
        "en": "Freshly made Coffee Espresso Milkshake, blended to order — the perfect refreshment.",
        "ar": "ميلك شيك كوفي اسبرسو طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0024",
      "categoryId": "cat-02",
      "price": 170,
      "image": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Pane Taco",
        "ar": "بانية تاكو"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Pane Taco, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بانية تاكو، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0025",
      "categoryId": "cat-02",
      "price": 195,
      "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Beef Burger Taco",
        "ar": "بيف برجر تاكو"
      },
      "desc": {
        "en": "Beef Burger Taco, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيف برجر تاكو يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0026",
      "categoryId": "cat-02",
      "price": 180,
      "image": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Zinger Taco",
        "ar": "زنجر تاكو"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Zinger Taco, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — زنجر تاكو، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0027",
      "categoryId": "cat-02",
      "price": 180,
      "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cordon Bleu Taco",
        "ar": "كوردن بلو تاكو"
      },
      "desc": {
        "en": "Cordon Bleu Taco, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "كوردن بلو تاكو يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0028",
      "categoryId": "cat-02",
      "price": 250,
      "image": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Shrimp Taco",
        "ar": "جمبرى تاكو"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Shrimp Taco, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — جمبرى تاكو، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0029",
      "categoryId": "cat-02",
      "price": 175,
      "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Beef Shawarma Taco",
        "ar": "شاورما لحم تاكو"
      },
      "desc": {
        "en": "Beef Shawarma Taco, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "شاورما لحم تاكو يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0030",
      "categoryId": "cat-02",
      "price": 165,
      "image": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Shish Tawook Taco",
        "ar": "شيش طاووق تاكو"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Shish Tawook Taco, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — شيش طاووق تاكو، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0031",
      "categoryId": "cat-02",
      "price": 175,
      "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Fajita Taco",
        "ar": "فهيتا دجاج تاكو"
      },
      "desc": {
        "en": "Chicken Fajita Taco, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "فهيتا دجاج تاكو يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0032",
      "categoryId": "cat-02",
      "price": 160,
      "image": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hot Dog Taco",
        "ar": "هوت دوج تاكو"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Hot Dog Taco, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — هوت دوج تاكو، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0033",
      "categoryId": "cat-03",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Kiwi Smoothie",
        "ar": "كيوى سموزى"
      },
      "desc": {
        "en": "Freshly made Kiwi Smoothie, blended to order — the perfect refreshment.",
        "ar": "كيوى سموزى طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0034",
      "categoryId": "cat-03",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Pineapple Smoothie",
        "ar": "اناناس سموزى"
      },
      "desc": {
        "en": "Pineapple Smoothie, prepared fresh with quality ingredients. Served chilled.",
        "ar": "اناناس سموزى يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0035",
      "categoryId": "cat-03",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Red Berry Smoothie",
        "ar": "توت احمر سموزى"
      },
      "desc": {
        "en": "Freshly made Red Berry Smoothie, blended to order — the perfect refreshment.",
        "ar": "توت احمر سموزى طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0036",
      "categoryId": "cat-03",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Peach Smoothie",
        "ar": "خوخ سموزى"
      },
      "desc": {
        "en": "Peach Smoothie, prepared fresh with quality ingredients. Served chilled.",
        "ar": "خوخ سموزى يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0037",
      "categoryId": "cat-03",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Strawberry Smoothie",
        "ar": "فراولة سموزى"
      },
      "desc": {
        "en": "Freshly made Strawberry Smoothie, blended to order — the perfect refreshment.",
        "ar": "فراولة سموزى طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0038",
      "categoryId": "cat-03",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mango Smoothie",
        "ar": "مانجو سموزى"
      },
      "desc": {
        "en": "Mango Smoothie, prepared fresh with quality ingredients. Served chilled.",
        "ar": "مانجو سموزى يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0039",
      "categoryId": "cat-03",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Lemon & Mint Smoothie",
        "ar": "ليمون نعناع سموزى"
      },
      "desc": {
        "en": "Freshly made Lemon & Mint Smoothie, blended to order — the perfect refreshment.",
        "ar": "ليمون نعناع سموزى طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0040",
      "categoryId": "cat-03",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Lemon Smoothie",
        "ar": "ليمون سموزي"
      },
      "desc": {
        "en": "Lemon Smoothie, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ليمون سموزي يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0041",
      "categoryId": "cat-03",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Blueberry Smoothie",
        "ar": "سموزي توت ازرق"
      },
      "desc": {
        "en": "Freshly made Blueberry Smoothie, blended to order — the perfect refreshment.",
        "ar": "سموزي توت ازرق طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0042",
      "categoryId": "cat-03",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Wild Berries Smoothie",
        "ar": "فواكهه بريه سموزي"
      },
      "desc": {
        "en": "Wild Berries Smoothie, prepared fresh with quality ingredients. Served chilled.",
        "ar": "فواكهه بريه سموزي يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0043",
      "categoryId": "cat-03",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Watermelon Smoothie",
        "ar": "بطيخ سموزي"
      },
      "desc": {
        "en": "Freshly made Watermelon Smoothie, blended to order — the perfect refreshment.",
        "ar": "بطيخ سموزي طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0044",
      "categoryId": "cat-04",
      "price": 70,
      "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Orange Juice",
        "ar": "برتقال"
      },
      "desc": {
        "en": "Freshly made Orange Juice, blended to order — the perfect refreshment.",
        "ar": "برتقال طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0045",
      "categoryId": "cat-04",
      "price": 70,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Strawberry Juice",
        "ar": "فراوله"
      },
      "desc": {
        "en": "Strawberry Juice, prepared fresh with quality ingredients. Served chilled.",
        "ar": "فراوله يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0046",
      "categoryId": "cat-04",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Dates Juice",
        "ar": "بلح"
      },
      "desc": {
        "en": "Freshly made Dates Juice, blended to order — the perfect refreshment.",
        "ar": "بلح طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0047",
      "categoryId": "cat-04",
      "price": 50,
      "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Tamarind Juice",
        "ar": "تمر هندى"
      },
      "desc": {
        "en": "Tamarind Juice, prepared fresh with quality ingredients. Served chilled.",
        "ar": "تمر هندى يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0048",
      "categoryId": "cat-04",
      "price": 35,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Fig Juice",
        "ar": "تين"
      },
      "desc": {
        "en": "Freshly made Fig Juice, blended to order — the perfect refreshment.",
        "ar": "تين طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0049",
      "categoryId": "cat-04",
      "price": 25,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Carob Juice",
        "ar": "خروب"
      },
      "desc": {
        "en": "Carob Juice, prepared fresh with quality ingredients. Served chilled.",
        "ar": "خروب يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0050",
      "categoryId": "cat-04",
      "price": 22,
      "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Doum Juice",
        "ar": "دووم"
      },
      "desc": {
        "en": "Freshly made Doum Juice, blended to order — the perfect refreshment.",
        "ar": "دووم طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0051",
      "categoryId": "cat-04",
      "price": 70,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Pomegranate Juice",
        "ar": "رومان"
      },
      "desc": {
        "en": "Pomegranate Juice, prepared fresh with quality ingredients. Served chilled.",
        "ar": "رومان يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0052",
      "categoryId": "cat-04",
      "price": 20,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Licorice Juice",
        "ar": "عرق سوس"
      },
      "desc": {
        "en": "Freshly made Licorice Juice, blended to order — the perfect refreshment.",
        "ar": "عرق سوس طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0053",
      "categoryId": "cat-04",
      "price": 65,
      "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Sobia Juice",
        "ar": "سوبيا"
      },
      "desc": {
        "en": "Sobia Juice, prepared fresh with quality ingredients. Served chilled.",
        "ar": "سوبيا يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0054",
      "categoryId": "cat-04",
      "price": 20,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Apricot Juice",
        "ar": "مشمش"
      },
      "desc": {
        "en": "Freshly made Apricot Juice, blended to order — the perfect refreshment.",
        "ar": "مشمش طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0055",
      "categoryId": "cat-04",
      "price": 40,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Kiwi Juice",
        "ar": "كيوى"
      },
      "desc": {
        "en": "Kiwi Juice, prepared fresh with quality ingredients. Served chilled.",
        "ar": "كيوى يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0056",
      "categoryId": "cat-04",
      "price": 70,
      "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mandarin Juice",
        "ar": "يوسفى"
      },
      "desc": {
        "en": "Freshly made Mandarin Juice, blended to order — the perfect refreshment.",
        "ar": "يوسفى طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0057",
      "categoryId": "cat-04",
      "price": 85,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mango Juice",
        "ar": "مانجو"
      },
      "desc": {
        "en": "Mango Juice, prepared fresh with quality ingredients. Served chilled.",
        "ar": "مانجو يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0058",
      "categoryId": "cat-05",
      "price": 45,
      "image": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Birell",
        "ar": "بيريل"
      },
      "desc": {
        "en": "Freshly made Birell, blended to order — the perfect refreshment.",
        "ar": "بيريل طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0059",
      "categoryId": "cat-05",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Red Bull",
        "ar": "ريدبول"
      },
      "desc": {
        "en": "Red Bull, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ريدبول يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0060",
      "categoryId": "cat-05",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mojito",
        "ar": "موخيتو"
      },
      "desc": {
        "en": "Freshly made Mojito, blended to order — the perfect refreshment.",
        "ar": "موخيتو طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0061",
      "categoryId": "cat-05",
      "price": 20,
      "image": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Water",
        "ar": "مياه كبيره"
      },
      "desc": {
        "en": "Large Water, prepared fresh with quality ingredients. Served chilled.",
        "ar": "مياه كبيره يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0062",
      "categoryId": "cat-05",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Sunshine",
        "ar": "صن شاين"
      },
      "desc": {
        "en": "Freshly made Sunshine, blended to order — the perfect refreshment.",
        "ar": "صن شاين طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0063",
      "categoryId": "cat-05",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Sunrise",
        "ar": "صن رايز"
      },
      "desc": {
        "en": "Sunrise, prepared fresh with quality ingredients. Served chilled.",
        "ar": "صن رايز يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0064",
      "categoryId": "cat-05",
      "price": 80,
      "image": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Berry Cola",
        "ar": "بيري كولا"
      },
      "desc": {
        "en": "Freshly made Berry Cola, blended to order — the perfect refreshment.",
        "ar": "بيري كولا طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0065",
      "categoryId": "cat-05",
      "price": 30,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Sprite Can",
        "ar": "سبرايت كان"
      },
      "desc": {
        "en": "Sprite Can, prepared fresh with quality ingredients. Served chilled.",
        "ar": "سبرايت كان يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0066",
      "categoryId": "cat-05",
      "price": 40,
      "image": "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Sprite Can (Dine-in)",
        "ar": "سبرايت كان صالة"
      },
      "desc": {
        "en": "Freshly made Sprite Can (Dine-in), blended to order — the perfect refreshment.",
        "ar": "سبرايت كان صالة طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0067",
      "categoryId": "cat-05",
      "price": 80,
      "image": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cherry Cola",
        "ar": "شيرى كولا"
      },
      "desc": {
        "en": "Cherry Cola, prepared fresh with quality ingredients. Served chilled.",
        "ar": "شيرى كولا يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0068",
      "categoryId": "cat-05",
      "price": 45,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Schweppes Gold",
        "ar": "شويبس جولد"
      },
      "desc": {
        "en": "Freshly made Schweppes Gold, blended to order — the perfect refreshment.",
        "ar": "شويبس جولد طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0069",
      "categoryId": "cat-05",
      "price": 45,
      "image": "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Fayrouz",
        "ar": "فيروز"
      },
      "desc": {
        "en": "Fayrouz, prepared fresh with quality ingredients. Served chilled.",
        "ar": "فيروز يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0070",
      "categoryId": "cat-05",
      "price": 30,
      "image": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cola Can",
        "ar": "كولا كان"
      },
      "desc": {
        "en": "Freshly made Cola Can, blended to order — the perfect refreshment.",
        "ar": "كولا كان طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0071",
      "categoryId": "cat-05",
      "price": 12,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Small Water",
        "ar": "مياة صغيره"
      },
      "desc": {
        "en": "Small Water, prepared fresh with quality ingredients. Served chilled.",
        "ar": "مياة صغيره يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0072",
      "categoryId": "cat-05",
      "price": 40,
      "image": "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cola Can (Dine-in)",
        "ar": "كولا كان صاله"
      },
      "desc": {
        "en": "Freshly made Cola Can (Dine-in), blended to order — the perfect refreshment.",
        "ar": "كولا كان صاله طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0073",
      "categoryId": "cat-05",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Red Bull Mojito",
        "ar": "موخيتو ريد بل"
      },
      "desc": {
        "en": "Red Bull Mojito, prepared fresh with quality ingredients. Served chilled.",
        "ar": "موخيتو ريد بل يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0074",
      "categoryId": "cat-05",
      "price": 45,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Toast",
        "ar": "توست"
      },
      "desc": {
        "en": "Freshly made Toast, blended to order — the perfect refreshment.",
        "ar": "توست طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0075",
      "categoryId": "cat-05",
      "price": 25,
      "image": "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Spiro Spathis",
        "ar": "سبيرو سباتس"
      },
      "desc": {
        "en": "Spiro Spathis, prepared fresh with quality ingredients. Served chilled.",
        "ar": "سبيرو سباتس يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0076",
      "categoryId": "cat-05",
      "price": 75,
      "image": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Blue Sky",
        "ar": "بلو سكاي"
      },
      "desc": {
        "en": "Freshly made Blue Sky, blended to order — the perfect refreshment.",
        "ar": "بلو سكاي طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0077",
      "categoryId": "cat-05",
      "price": 45,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "V Cola",
        "ar": "v cola"
      },
      "desc": {
        "en": "V Cola, prepared fresh with quality ingredients. Served chilled.",
        "ar": "v cola يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0078",
      "categoryId": "cat-05",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Electric Lemon",
        "ar": "اليكتريك ليمون"
      },
      "desc": {
        "en": "Freshly made Electric Lemon, blended to order — the perfect refreshment.",
        "ar": "اليكتريك ليمون طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0079",
      "categoryId": "cat-05",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Soda",
        "ar": "لاتينو صودا"
      },
      "desc": {
        "en": "Latino Soda, prepared fresh with quality ingredients. Served chilled.",
        "ar": "لاتينو صودا يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0080",
      "categoryId": "cat-05",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Blue Sky",
        "ar": "بلو سكاي"
      },
      "desc": {
        "en": "Freshly made Blue Sky, blended to order — the perfect refreshment.",
        "ar": "بلو سكاي طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0081",
      "categoryId": "cat-06",
      "price": 115,
      "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Oriental Hawawshi",
        "ar": "حواوشى شرقى"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Oriental Hawawshi, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — حواوشى شرقى، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0082",
      "categoryId": "cat-06",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Grilled Steak Sandwich",
        "ar": "استيك مشوى سندوتش"
      },
      "desc": {
        "en": "Grilled Steak Sandwich, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "استيك مشوى سندوتش يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0083",
      "categoryId": "cat-06",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Double Kebab Cheese Sandwich",
        "ar": "دوبر كباب تشيز سندوتش"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Double Kebab Cheese Sandwich, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — دوبر كباب تشيز سندوتش، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0084",
      "categoryId": "cat-06",
      "price": 125,
      "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Oriental Sausage Sandwich",
        "ar": "ساندوتش سجق شرقي"
      },
      "desc": {
        "en": "Oriental Sausage Sandwich, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "ساندوتش سجق شرقي يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0085",
      "categoryId": "cat-06",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Grilled Kofta Sandwich",
        "ar": "ساندوتش كفته مشويه"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Grilled Kofta Sandwich, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — ساندوتش كفته مشويه، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0086",
      "categoryId": "cat-06",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Beef Shawarma Sandwich",
        "ar": "شاورما لحم سندوتش"
      },
      "desc": {
        "en": "Beef Shawarma Sandwich, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "شاورما لحم سندوتش يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0087",
      "categoryId": "cat-06",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Beef Fajita Sandwich",
        "ar": "فاهيتا لحم سندوتش"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Beef Fajita Sandwich, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — فاهيتا لحم سندوتش، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0088",
      "categoryId": "cat-06",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mexican Hot Dog Sandwich",
        "ar": "هوت دوج مكسيكان سندوتش"
      },
      "desc": {
        "en": "Mexican Hot Dog Sandwich, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "هوت دوج مكسيكان سندوتش يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0089",
      "categoryId": "cat-06",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Alexandrian Liver Sandwich",
        "ar": "كبده اسكندرانى سندوتش"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Alexandrian Liver Sandwich, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — كبده اسكندرانى سندوتش، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0090",
      "categoryId": "cat-07",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Arrabbiata Pasta",
        "ar": "ارابياتا"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Arrabbiata Pasta, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — ارابياتا، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0091",
      "categoryId": "cat-07",
      "price": 180,
      "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Sausage Pasta",
        "ar": "باستا سوسيس"
      },
      "desc": {
        "en": "Sausage Pasta, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "باستا سوسيس يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0092",
      "categoryId": "cat-07",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Bolognese Pasta",
        "ar": "باستا بولونيز"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Bolognese Pasta, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — باستا بولونيز، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0093",
      "categoryId": "cat-07",
      "price": 200,
      "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Alfredo Pasta",
        "ar": "الفريدو"
      },
      "desc": {
        "en": "Alfredo Pasta, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "الفريدو يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0094",
      "categoryId": "cat-07",
      "price": 200,
      "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Imansia Pasta",
        "ar": "ايمانسية"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Imansia Pasta, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — ايمانسية، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0095",
      "categoryId": "cat-07",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Penne Grilled Chicken Pasta",
        "ar": "بنا جريل تشكن"
      },
      "desc": {
        "en": "Penne Grilled Chicken Pasta, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بنا جريل تشكن يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0096",
      "categoryId": "cat-07",
      "price": 220,
      "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Supreme Pasta",
        "ar": "باستا سوبريم"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Supreme Pasta, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — باستا سوبريم، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0097",
      "categoryId": "cat-07",
      "price": 295,
      "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Gambrito Pasta",
        "ar": "جمبريتو"
      },
      "desc": {
        "en": "Gambrito Pasta, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "جمبريتو يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0098",
      "categoryId": "cat-07",
      "price": 200,
      "image": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Pesto Pasta",
        "ar": "بيستو"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Pesto Pasta, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيستو، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0099",
      "categoryId": "cat-07",
      "price": 205,
      "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Negresco Pasta",
        "ar": "نجرسكو"
      },
      "desc": {
        "en": "Negresco Pasta, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "نجرسكو يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0100",
      "categoryId": "cat-07",
      "price": 320,
      "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Frutti di Mare",
        "ar": "فروتى دى مارى"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Frutti di Mare, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — فروتى دى مارى، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0101",
      "categoryId": "cat-07",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Volcano Red Sauce Pasta",
        "ar": "فولكانو ريد صوص"
      },
      "desc": {
        "en": "Volcano Red Sauce Pasta, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "فولكانو ريد صوص يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0102",
      "categoryId": "cat-07",
      "price": 250,
      "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Pro Pasta",
        "ar": "باستا لاتينو برو"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Latino Pro Pasta, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — باستا لاتينو برو، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0103",
      "categoryId": "cat-07",
      "price": 195,
      "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Ocean White Strips Pasta",
        "ar": "باستا اوشن وايت استربس"
      },
      "desc": {
        "en": "Ocean White Strips Pasta, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "باستا اوشن وايت استربس يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0104",
      "categoryId": "cat-07",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Meatball Pasta",
        "ar": "باستا ميت بول"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Meatball Pasta, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — باستا ميت بول، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0105",
      "categoryId": "cat-07",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Beef Lasagna Pasta",
        "ar": "باستا لازنيا لحم"
      },
      "desc": {
        "en": "Beef Lasagna Pasta, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "باستا لازنيا لحم يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0106",
      "categoryId": "cat-08",
      "price": 310,
      "image": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Funghi",
        "ar": "تشكن فونجي"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Chicken Funghi, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — تشكن فونجي، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0107",
      "categoryId": "cat-08",
      "price": 290,
      "image": "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Alakif Roll",
        "ar": "تشكن اللاكيف رول"
      },
      "desc": {
        "en": "Chicken Alakif Roll, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "تشكن اللاكيف رول يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0108",
      "categoryId": "cat-08",
      "price": 325,
      "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Manhattan",
        "ar": "تشكن مانيهاتن"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Chicken Manhattan, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — تشكن مانيهاتن، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0109",
      "categoryId": "cat-08",
      "price": 290,
      "image": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Country Pane",
        "ar": "كانتري بانية"
      },
      "desc": {
        "en": "Country Pane, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "كانتري بانية يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0110",
      "categoryId": "cat-08",
      "price": 320,
      "image": "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Mix Meal",
        "ar": "تشيكن ميكس وجبه"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Chicken Mix Meal, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — تشيكن ميكس وجبه، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0111",
      "categoryId": "cat-08",
      "price": 290,
      "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Fajita Meal",
        "ar": "وجبة فاهيتا دجاج"
      },
      "desc": {
        "en": "Chicken Fajita Meal, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "وجبة فاهيتا دجاج يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0112",
      "categoryId": "cat-08",
      "price": 320,
      "image": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cordon Bleu Meal",
        "ar": "كوردن بلو وجبة"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Cordon Bleu Meal, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — كوردن بلو وجبة، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0113",
      "categoryId": "cat-09",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Pane Crepe",
        "ar": "بانية كريب"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Pane Crepe, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بانية كريب، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0114",
      "categoryId": "cat-09",
      "price": 165,
      "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Zinger Crepe",
        "ar": "زنجر كريب"
      },
      "desc": {
        "en": "Zinger Crepe, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "زنجر كريب يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0115",
      "categoryId": "cat-09",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Beef Burger Crepe",
        "ar": "بيف برجر كريب"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Beef Burger Crepe, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيف برجر كريب، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0116",
      "categoryId": "cat-09",
      "price": 30,
      "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Crepe Roll",
        "ar": "رول كريب"
      },
      "desc": {
        "en": "Crepe Roll, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "رول كريب يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0117",
      "categoryId": "cat-09",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Beef Shawarma Crepe",
        "ar": "شاورما لحم كريب"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Beef Shawarma Crepe, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — شاورما لحم كريب، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0118",
      "categoryId": "cat-09",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Italian Sausage Crepe",
        "ar": "سوسيس ايطالى كريب"
      },
      "desc": {
        "en": "Italian Sausage Crepe, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "سوسيس ايطالى كريب يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0119",
      "categoryId": "cat-09",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Shish Tawook Crepe",
        "ar": "شيش طاووق كريب"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Shish Tawook Crepe, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — شيش طاووق كريب، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0120",
      "categoryId": "cat-09",
      "price": 160,
      "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Fajita Crepe",
        "ar": "فاهيتا فراخ كريب"
      },
      "desc": {
        "en": "Chicken Fajita Crepe, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "فاهيتا فراخ كريب يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0121",
      "categoryId": "cat-09",
      "price": 170,
      "image": "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cordon Bleu Crepe",
        "ar": "كوردن بلو كريب"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Cordon Bleu Crepe, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — كوردن بلو كريب، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0122",
      "categoryId": "cat-09",
      "price": 180,
      "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mixed Meats Crepe",
        "ar": "مشكل لحوم كريب"
      },
      "desc": {
        "en": "Mixed Meats Crepe, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "مشكل لحوم كريب يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0123",
      "categoryId": "cat-09",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hot Dog Crepe",
        "ar": "هوت دوج كريب"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Hot Dog Crepe, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — هوت دوج كريب، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0124",
      "categoryId": "cat-09",
      "price": 180,
      "image": "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Mix Crepe",
        "ar": "ميكس فراخ كريب"
      },
      "desc": {
        "en": "Chicken Mix Crepe, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "ميكس فراخ كريب يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0125",
      "categoryId": "cat-09",
      "price": 50,
      "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Extra Mozzarella Crepe",
        "ar": "اضافه موتزاريلا كريب"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Extra Mozzarella Crepe, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — اضافه موتزاريلا كريب، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0126",
      "categoryId": "cat-09",
      "price": 170,
      "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Pane & Sausage Crepe",
        "ar": "كريب بانية و سوسيس"
      },
      "desc": {
        "en": "Pane & Sausage Crepe, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "كريب بانية و سوسيس يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0127",
      "categoryId": "cat-09",
      "price": 170,
      "image": "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Strips & Sausage Crepe",
        "ar": "كريب استربس و سوسيس"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Strips & Sausage Crepe, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — كريب استربس و سوسيس، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0128",
      "categoryId": "cat-09",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Crispy Shrimp Crepe",
        "ar": "كريب جمبري كرسبي"
      },
      "desc": {
        "en": "Crispy Shrimp Crepe, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "كريب جمبري كرسبي يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0129",
      "categoryId": "cat-09",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Potato Crepe",
        "ar": "كريب بطاطس"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Potato Crepe, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — كريب بطاطس، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0130",
      "categoryId": "cat-09",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cheese Mix Crepe",
        "ar": "كريب ميكس تشيز"
      },
      "desc": {
        "en": "Cheese Mix Crepe, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "كريب ميكس تشيز يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0131",
      "categoryId": "cat-10",
      "price": 410,
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Max Max",
        "ar": "ماكس ماكس"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Max Max, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — ماكس ماكس، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0132",
      "categoryId": "cat-10",
      "price": 390,
      "image": "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Beef Piccata with Mushroom",
        "ar": "بيكاتا بيف مشروم"
      },
      "desc": {
        "en": "Beef Piccata with Mushroom, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيكاتا بيف مشروم يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0133",
      "categoryId": "cat-10",
      "price": 390,
      "image": "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Escalope Pane",
        "ar": "اسكالوب بانيه"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Escalope Pane, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — اسكالوب بانيه، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0134",
      "categoryId": "cat-10",
      "price": 390,
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Fillet Steak",
        "ar": "فليه ستيك"
      },
      "desc": {
        "en": "Fillet Steak, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "فليه ستيك يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0135",
      "categoryId": "cat-11",
      "price": 135,
      "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Kahk with Nuts",
        "ar": "كحك مكسرات"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Kahk with Nuts, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — كحك مكسرات، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0136",
      "categoryId": "cat-11",
      "price": 125,
      "image": "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Petit Four",
        "ar": "بيتى فور"
      },
      "desc": {
        "en": "Petit Four, our homemade dessert prepared fresh every day.",
        "ar": "بيتى فور من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0137",
      "categoryId": "cat-11",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Orange Biscuits",
        "ar": "بسكويت برتقال"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Orange Biscuits, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — بسكويت برتقال، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0138",
      "categoryId": "cat-11",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Nashader Biscuits",
        "ar": "بسكويت نشادر"
      },
      "desc": {
        "en": "Nashader Biscuits, our homemade dessert prepared fresh every day.",
        "ar": "بسكويت نشادر من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0139",
      "categoryId": "cat-11",
      "price": 105,
      "image": "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Kahk with Malban",
        "ar": "كحك ملبن"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Kahk with Malban, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — كحك ملبن، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0140",
      "categoryId": "cat-11",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Plain Kahk",
        "ar": "كحك ساده"
      },
      "desc": {
        "en": "Plain Kahk, our homemade dessert prepared fresh every day.",
        "ar": "كحك ساده من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0141",
      "categoryId": "cat-11",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Ghorayeba with Nuts",
        "ar": "غريبة مكسرات"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Ghorayeba with Nuts, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — غريبة مكسرات، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0142",
      "categoryId": "cat-11",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Coconut Biscuits",
        "ar": "بسكويت جوز هند"
      },
      "desc": {
        "en": "Coconut Biscuits, our homemade dessert prepared fresh every day.",
        "ar": "بسكويت جوز هند من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0143",
      "categoryId": "cat-12",
      "price": 230,
      "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cheese Lovers Burger",
        "ar": "برجر تشيز لافرز"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Cheese Lovers Burger, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — برجر تشيز لافرز، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0144",
      "categoryId": "cat-12",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Bacon Burger",
        "ar": "بيكون برجر"
      },
      "desc": {
        "en": "Bacon Burger, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيكون برجر يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0145",
      "categoryId": "cat-12",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chili Burger",
        "ar": "تشيلى برجر"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Chili Burger, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — تشيلى برجر، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0146",
      "categoryId": "cat-12",
      "price": 270,
      "image": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Beef Burger",
        "ar": "لاتينو بيف برجر"
      },
      "desc": {
        "en": "Latino Beef Burger, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "لاتينو بيف برجر يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0147",
      "categoryId": "cat-12",
      "price": 240,
      "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Double Duggler Burger",
        "ar": "دابل دجلر برجر"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Double Duggler Burger, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — دابل دجلر برجر، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0148",
      "categoryId": "cat-12",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Caramelo Burger",
        "ar": "كراميلو برجر"
      },
      "desc": {
        "en": "Caramelo Burger, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "كراميلو برجر يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0149",
      "categoryId": "cat-12",
      "price": 175,
      "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Max Burger",
        "ar": "ماكس برجر"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Max Burger, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — ماكس برجر، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0150",
      "categoryId": "cat-12",
      "price": 220,
      "image": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Nachos Cheese Burger",
        "ar": "ناتشوز تشيز برجر"
      },
      "desc": {
        "en": "Nachos Cheese Burger, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "ناتشوز تشيز برجر يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0151",
      "categoryId": "cat-12",
      "price": 240,
      "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cheetos Beef Deluxe Burger",
        "ar": "شيتوس بيف ديلوكس برجر"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Cheetos Beef Deluxe Burger, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — شيتوس بيف ديلوكس برجر، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0152",
      "categoryId": "cat-12",
      "price": 230,
      "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Pretzel Burger",
        "ar": "برجر لاتينو بريتزل"
      },
      "desc": {
        "en": "Latino Pretzel Burger, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "برجر لاتينو بريتزل يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0153",
      "categoryId": "cat-12",
      "price": 240,
      "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Burger Loaf",
        "ar": "رغيف برجر"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Burger Loaf, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — رغيف برجر، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0154",
      "categoryId": "cat-12",
      "price": 195,
      "image": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Kids Meal",
        "ar": "وجبة اطفال"
      },
      "desc": {
        "en": "Kids Meal, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "وجبة اطفال يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0155",
      "categoryId": "cat-13",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Berry Cheesecake",
        "ar": "تشيز كيك توت"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Berry Cheesecake, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — تشيز كيك توت، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0156",
      "categoryId": "cat-13",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Oreo Cheesecake",
        "ar": "تشيز كيك اوريو"
      },
      "desc": {
        "en": "Oreo Cheesecake, our homemade dessert prepared fresh every day.",
        "ar": "تشيز كيك اوريو من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0157",
      "categoryId": "cat-13",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Walnut Brownies",
        "ar": "براونىز عين جمل"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Walnut Brownies, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — براونىز عين جمل، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0158",
      "categoryId": "cat-13",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Classic Cheesecake",
        "ar": "تشيز كيك كلاسيك"
      },
      "desc": {
        "en": "Classic Cheesecake, our homemade dessert prepared fresh every day.",
        "ar": "تشيز كيك كلاسيك من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0159",
      "categoryId": "cat-13",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chocolate Cheesecake",
        "ar": "تشيز كيك شوكلاتة"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Chocolate Cheesecake, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — تشيز كيك شوكلاتة، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0160",
      "categoryId": "cat-13",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Strawberry Cheesecake",
        "ar": "تشيز كيك فراولة"
      },
      "desc": {
        "en": "Strawberry Cheesecake, our homemade dessert prepared fresh every day.",
        "ar": "تشيز كيك فراولة من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0161",
      "categoryId": "cat-13",
      "price": 85,
      "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Caramel Cheesecake",
        "ar": "تشيز كيك كراميل"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Caramel Cheesecake, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — تشيز كيك كراميل، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0162",
      "categoryId": "cat-13",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cinnabon",
        "ar": "سينابون"
      },
      "desc": {
        "en": "Cinnabon, our homemade dessert prepared fresh every day.",
        "ar": "سينابون من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0163",
      "categoryId": "cat-13",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chocolate Fudge Cake",
        "ar": "شوكليت كيك فادج"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Chocolate Fudge Cake, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — شوكليت كيك فادج، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0164",
      "categoryId": "cat-13",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Molten Lotus Cake with Ice Cream",
        "ar": "مولتن كيك لوتس ايس"
      },
      "desc": {
        "en": "Molten Lotus Cake with Ice Cream, our homemade dessert prepared fresh every day.",
        "ar": "مولتن كيك لوتس ايس من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0165",
      "categoryId": "cat-13",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Molten Chocolate Cake with Ice Cream",
        "ar": "مولتن كيك شيكولانه ايس"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Molten Chocolate Cake with Ice Cream, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — مولتن كيك شيكولانه ايس، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0166",
      "categoryId": "cat-13",
      "price": 105,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Red Velvet",
        "ar": "ريد فيلفيد"
      },
      "desc": {
        "en": "Red Velvet, our homemade dessert prepared fresh every day.",
        "ar": "ريد فيلفيد من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0167",
      "categoryId": "cat-13",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Lotus Cheesecake",
        "ar": "تشيز كيك لوتس"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Lotus Cheesecake, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — تشيز كيك لوتس، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0168",
      "categoryId": "cat-13",
      "price": 85,
      "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Honey Cake",
        "ar": "هني كيك"
      },
      "desc": {
        "en": "Honey Cake, our homemade dessert prepared fresh every day.",
        "ar": "هني كيك من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0169",
      "categoryId": "cat-13",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Tiramisu Cake",
        "ar": "تيراميسيوكيك"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Tiramisu Cake, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — تيراميسيوكيك، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0170",
      "categoryId": "cat-13",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Molten Nutella Cake with Ice Cream",
        "ar": "مولتن كيك نوتيلا ايس"
      },
      "desc": {
        "en": "Molten Nutella Cake with Ice Cream, our homemade dessert prepared fresh every day.",
        "ar": "مولتن كيك نوتيلا ايس من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0171",
      "categoryId": "cat-13",
      "price": 90,
      "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Oreo Cake",
        "ar": "اوريو كيك"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Oreo Cake, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — اوريو كيك، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0172",
      "categoryId": "cat-13",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cherry Cheesecake",
        "ar": "تشيزكيك كريز"
      },
      "desc": {
        "en": "Cherry Cheesecake, our homemade dessert prepared fresh every day.",
        "ar": "تشيزكيك كريز من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0173",
      "categoryId": "cat-13",
      "price": 90,
      "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Kinder Cake",
        "ar": "كيندر كيك"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Kinder Cake, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — كيندر كيك، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0174",
      "categoryId": "cat-13",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Kinder Cheesecake",
        "ar": "تشيز كيك كيندر"
      },
      "desc": {
        "en": "Kinder Cheesecake, our homemade dessert prepared fresh every day.",
        "ar": "تشيز كيك كيندر من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0175",
      "categoryId": "cat-13",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Nutella Cheesecake",
        "ar": "تشيز كيك نوتيلا"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Nutella Cheesecake, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — تشيز كيك نوتيلا، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0176",
      "categoryId": "cat-13",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "San Sebastian Cake",
        "ar": "سان سبيستيان كيك"
      },
      "desc": {
        "en": "San Sebastian Cake, our homemade dessert prepared fresh every day.",
        "ar": "سان سبيستيان كيك من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0177",
      "categoryId": "cat-13",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Galaxy Cake",
        "ar": "جلاكسي كيك"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Galaxy Cake, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — جلاكسي كيك، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0178",
      "categoryId": "cat-13",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Molten Cake",
        "ar": "مولتن كيك"
      },
      "desc": {
        "en": "Molten Cake, our homemade dessert prepared fresh every day.",
        "ar": "مولتن كيك من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0179",
      "categoryId": "cat-13",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "John Janna Cake",
        "ar": "جون جانا كيك"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — John Janna Cake, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — جون جانا كيك، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0180",
      "categoryId": "cat-13",
      "price": 160,
      "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Cheesy",
        "ar": "لاتينوز تشيزي"
      },
      "desc": {
        "en": "Latino Cheesy, our homemade dessert prepared fresh every day.",
        "ar": "لاتينوز تشيزي من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0181",
      "categoryId": "cat-13",
      "price": 170,
      "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Froleta Fruity",
        "ar": "فروليتا فروتي"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Froleta Fruity, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — فروليتا فروتي، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0182",
      "categoryId": "cat-13",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Snickers Cheesecake",
        "ar": "تشيز كيك سنيكرز"
      },
      "desc": {
        "en": "Snickers Cheesecake, our homemade dessert prepared fresh every day.",
        "ar": "تشيز كيك سنيكرز من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0183",
      "categoryId": "cat-13",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Matcha Cheesecake",
        "ar": "تشيز كيك ماتشا"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Matcha Cheesecake, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — تشيز كيك ماتشا، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0184",
      "categoryId": "cat-14",
      "price": 50,
      "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Coleslaw",
        "ar": "كلوسلو"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Coleslaw, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — كلوسلو، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0185",
      "categoryId": "cat-14",
      "price": 13,
      "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Pickles",
        "ar": "مخلل"
      },
      "desc": {
        "en": "Pickles, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "مخلل يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0186",
      "categoryId": "cat-14",
      "price": 30,
      "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Green Salad",
        "ar": "سلطه خضراء"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Green Salad, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — سلطه خضراء، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0187",
      "categoryId": "cat-14",
      "price": 18,
      "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Tahini",
        "ar": "طحينه"
      },
      "desc": {
        "en": "Tahini, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "طحينه يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0188",
      "categoryId": "cat-14",
      "price": 25,
      "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Toumeya Garlic Sauce",
        "ar": "ثومية"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Toumeya Garlic Sauce, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — ثومية، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0189",
      "categoryId": "cat-14",
      "price": 165,
      "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Caesar Salad",
        "ar": "تشكن سيزار سلاط"
      },
      "desc": {
        "en": "Chicken Caesar Salad, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "تشكن سيزار سلاط يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0190",
      "categoryId": "cat-15",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Dark / White Chocolate Mocha",
        "ar": "موكا شوكليت دارك / وايت"
      },
      "desc": {
        "en": "Expertly brewed Dark / White Chocolate Mocha, served hot and fresh.",
        "ar": "موكا شوكليت دارك / وايت يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0191",
      "categoryId": "cat-15",
      "price": 85,
      "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Flat White",
        "ar": "فلات وايت"
      },
      "desc": {
        "en": "Flat White, brewed to order with premium beans and ingredients.",
        "ar": "فلات وايت يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0192",
      "categoryId": "cat-15",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hot Spanish Latte",
        "ar": "هوت اسبانش لاتيه"
      },
      "desc": {
        "en": "Expertly brewed Hot Spanish Latte, served hot and fresh.",
        "ar": "هوت اسبانش لاتيه يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0193",
      "categoryId": "cat-15",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hot Nutella",
        "ar": "هو ت نوتيلا"
      },
      "desc": {
        "en": "Hot Nutella, brewed to order with premium beans and ingredients.",
        "ar": "هو ت نوتيلا يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0194",
      "categoryId": "cat-15",
      "price": 75,
      "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Double Espresso",
        "ar": "اسبرسو دبل"
      },
      "desc": {
        "en": "Expertly brewed Double Espresso, served hot and fresh.",
        "ar": "اسبرسو دبل يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0195",
      "categoryId": "cat-15",
      "price": 65,
      "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Single Espresso",
        "ar": "اسبرسو سنجل"
      },
      "desc": {
        "en": "Single Espresso, brewed to order with premium beans and ingredients.",
        "ar": "اسبرسو سنجل يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0196",
      "categoryId": "cat-15",
      "price": 30,
      "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Extra Milk",
        "ar": "اضافة حليب"
      },
      "desc": {
        "en": "Expertly brewed Extra Milk, served hot and fresh.",
        "ar": "اضافة حليب يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0197",
      "categoryId": "cat-15",
      "price": 35,
      "image": "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Tea",
        "ar": "شاى"
      },
      "desc": {
        "en": "Tea, brewed to order with premium beans and ingredients.",
        "ar": "شاى يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0198",
      "categoryId": "cat-15",
      "price": 45,
      "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Flavoured Tea",
        "ar": "شاى فلفر"
      },
      "desc": {
        "en": "Expertly brewed Flavoured Tea, served hot and fresh.",
        "ar": "شاى فلفر يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0199",
      "categoryId": "cat-15",
      "price": 60,
      "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Double Coffee",
        "ar": "قهوة دوبل"
      },
      "desc": {
        "en": "Double Coffee, brewed to order with premium beans and ingredients.",
        "ar": "قهوة دوبل يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0200",
      "categoryId": "cat-15",
      "price": 45,
      "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Small Coffee",
        "ar": "قهوة صغير"
      },
      "desc": {
        "en": "Expertly brewed Small Coffee, served hot and fresh.",
        "ar": "قهوة صغير يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0201",
      "categoryId": "cat-15",
      "price": 70,
      "image": "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hazelnut Coffee",
        "ar": "قهوة بندق"
      },
      "desc": {
        "en": "Hazelnut Coffee, brewed to order with premium beans and ingredients.",
        "ar": "قهوة بندق يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0202",
      "categoryId": "cat-15",
      "price": 70,
      "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "French Coffee",
        "ar": "فرنساوى"
      },
      "desc": {
        "en": "Expertly brewed French Coffee, served hot and fresh.",
        "ar": "فرنساوى يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0203",
      "categoryId": "cat-15",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cappuccino",
        "ar": "كابتشينو"
      },
      "desc": {
        "en": "Cappuccino, brewed to order with premium beans and ingredients.",
        "ar": "كابتشينو يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0204",
      "categoryId": "cat-15",
      "price": 70,
      "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Double Macchiato",
        "ar": "ميكاتو دبل"
      },
      "desc": {
        "en": "Expertly brewed Double Macchiato, served hot and fresh.",
        "ar": "ميكاتو دبل يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0205",
      "categoryId": "cat-15",
      "price": 85,
      "image": "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Caffè Latte",
        "ar": "كوفى لاتية"
      },
      "desc": {
        "en": "Caffè Latte, brewed to order with premium beans and ingredients.",
        "ar": "كوفى لاتية يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0206",
      "categoryId": "cat-15",
      "price": 90,
      "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Nescafé",
        "ar": "نسكافية"
      },
      "desc": {
        "en": "Expertly brewed Nescafé, served hot and fresh.",
        "ar": "نسكافية يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0207",
      "categoryId": "cat-15",
      "price": 90,
      "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hot Chocolate",
        "ar": "هوت شوكليت"
      },
      "desc": {
        "en": "Hot Chocolate, brewed to order with premium beans and ingredients.",
        "ar": "هوت شوكليت يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0208",
      "categoryId": "cat-15",
      "price": 35,
      "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Anise",
        "ar": "ينسون"
      },
      "desc": {
        "en": "Expertly brewed Anise, served hot and fresh.",
        "ar": "ينسون يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0209",
      "categoryId": "cat-15",
      "price": 65,
      "image": "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hot Cider",
        "ar": "هوت سيدار"
      },
      "desc": {
        "en": "Hot Cider, brewed to order with premium beans and ingredients.",
        "ar": "هوت سيدار يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0210",
      "categoryId": "cat-15",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hot Lotus Latte",
        "ar": "هوت لوتس لاتيه"
      },
      "desc": {
        "en": "Expertly brewed Hot Lotus Latte, served hot and fresh.",
        "ar": "هوت لوتس لاتيه يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0211",
      "categoryId": "cat-15",
      "price": 15,
      "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Extra Tea Bag",
        "ar": "اضافه فتله"
      },
      "desc": {
        "en": "Extra Tea Bag, brewed to order with premium beans and ingredients.",
        "ar": "اضافه فتله يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0212",
      "categoryId": "cat-15",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hot Nutella",
        "ar": "هوت نوتيلا"
      },
      "desc": {
        "en": "Expertly brewed Hot Nutella, served hot and fresh.",
        "ar": "هوت نوتيلا يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0213",
      "categoryId": "cat-15",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hot Lotus",
        "ar": "هوت لوتس"
      },
      "desc": {
        "en": "Hot Lotus, brewed to order with premium beans and ingredients.",
        "ar": "هوت لوتس يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0214",
      "categoryId": "cat-15",
      "price": 90,
      "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hot Oreo",
        "ar": "هوت اوريو"
      },
      "desc": {
        "en": "Expertly brewed Hot Oreo, served hot and fresh.",
        "ar": "هوت اوريو يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0215",
      "categoryId": "cat-15",
      "price": 60,
      "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Herbs",
        "ar": "اعشاب لاتينو"
      },
      "desc": {
        "en": "Latino Herbs, brewed to order with premium beans and ingredients.",
        "ar": "اعشاب لاتينو يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0216",
      "categoryId": "cat-15",
      "price": 60,
      "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Karak Tea",
        "ar": "شاي كرك"
      },
      "desc": {
        "en": "Expertly brewed Karak Tea, served hot and fresh.",
        "ar": "شاي كرك يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0217",
      "categoryId": "cat-15",
      "price": 40,
      "image": "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Herbal Tea",
        "ar": "اعشاب"
      },
      "desc": {
        "en": "Herbal Tea, brewed to order with premium beans and ingredients.",
        "ar": "اعشاب يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0218",
      "categoryId": "cat-15",
      "price": 80,
      "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Nutella Coffee",
        "ar": "قهوة نوتيلا"
      },
      "desc": {
        "en": "Expertly brewed Nutella Coffee, served hot and fresh.",
        "ar": "قهوة نوتيلا يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0219",
      "categoryId": "cat-15",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Avocado Smoothie",
        "ar": "افوكادو"
      },
      "desc": {
        "en": "Avocado Smoothie, brewed to order with premium beans and ingredients.",
        "ar": "افوكادو يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0220",
      "categoryId": "cat-15",
      "price": 75,
      "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cortado",
        "ar": "كورتادو"
      },
      "desc": {
        "en": "Expertly brewed Cortado, served hot and fresh.",
        "ar": "كورتادو يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0221",
      "categoryId": "cat-16",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mombar",
        "ar": "ممبار"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Mombar, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — ممبار، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0222",
      "categoryId": "cat-16",
      "price": 85,
      "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Grape Leaves",
        "ar": "ورق عنب"
      },
      "desc": {
        "en": "Grape Leaves, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "ورق عنب يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0223",
      "categoryId": "cat-16",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Beef Sambousek",
        "ar": "سمبوسك لحمه"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Beef Sambousek, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — سمبوسك لحمه، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0224",
      "categoryId": "cat-16",
      "price": 90,
      "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cheese Sambousek",
        "ar": "سمبوسك جبنه"
      },
      "desc": {
        "en": "Cheese Sambousek, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "سمبوسك جبنه يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0225",
      "categoryId": "cat-16",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mixed Sambousek",
        "ar": "سمبوسك ميكس"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Mixed Sambousek, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — سمبوسك ميكس، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0226",
      "categoryId": "cat-16",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Oriental Mixed Appetizers",
        "ar": "مقبلات مشكله شرقي"
      },
      "desc": {
        "en": "Oriental Mixed Appetizers, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "مقبلات مشكله شرقي يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0227",
      "categoryId": "cat-16",
      "price": 50,
      "image": "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Sautéed Vegetables",
        "ar": "خضار سوتيه"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Sautéed Vegetables, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — خضار سوتيه، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0228",
      "categoryId": "cat-16",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Vegetable Spring Rolls",
        "ar": "اسبرنج رول خضار"
      },
      "desc": {
        "en": "Vegetable Spring Rolls, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "اسبرنج رول خضار يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0229",
      "categoryId": "cat-16",
      "price": 90,
      "image": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Ultimate Fried Cheese Fries",
        "ar": "الوميت فرايد فرايز تشيز تشيز"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Ultimate Fried Cheese Fries, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — الوميت فرايد فرايز تشيز تشيز، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0230",
      "categoryId": "cat-16",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Spring Rolls",
        "ar": "اسبرنج رول دجاج"
      },
      "desc": {
        "en": "Chicken Spring Rolls, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "اسبرنج رول دجاج يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0231",
      "categoryId": "cat-16",
      "price": 90,
      "image": "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Onion Rings",
        "ar": "حلقات بصل"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Onion Rings, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — حلقات بصل، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0232",
      "categoryId": "cat-16",
      "price": 90,
      "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Garlic Bread Supreme",
        "ar": "جارليك بريد سوبريم"
      },
      "desc": {
        "en": "Garlic Bread Supreme, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "جارليك بريد سوبريم يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0233",
      "categoryId": "cat-16",
      "price": 175,
      "image": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Beef Fries",
        "ar": "فرايز بيف بيف"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Beef Fries, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — فرايز بيف بيف، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0234",
      "categoryId": "cat-16",
      "price": 80,
      "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Fresks Fries",
        "ar": "فرسكس فرايز"
      },
      "desc": {
        "en": "Fresks Fries, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "فرسكس فرايز يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0235",
      "categoryId": "cat-16",
      "price": 70,
      "image": "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Texas Fries",
        "ar": "لاتينو تكساس فرايز"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Latino Texas Fries, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — لاتينو تكساس فرايز، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0236",
      "categoryId": "cat-16",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Chili Fries Max",
        "ar": "لاتينو تشيلي فرايز ماكس"
      },
      "desc": {
        "en": "Latino Chili Fries Max, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "لاتينو تشيلي فرايز ماكس يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0237",
      "categoryId": "cat-16",
      "price": 90,
      "image": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Jalapeño Mozzarella Sticks",
        "ar": "موتزاريلا ستيكس هالبينو"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Jalapeño Mozzarella Sticks, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — موتزاريلا ستيكس هالبينو، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0238",
      "categoryId": "cat-16",
      "price": 105,
      "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mozzarella Sticks",
        "ar": "موتزاريلا ستيكس"
      },
      "desc": {
        "en": "Mozzarella Sticks, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "موتزاريلا ستيكس يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0239",
      "categoryId": "cat-16",
      "price": 175,
      "image": "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mixed Sticks",
        "ar": "ميكس استيكس"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Mixed Sticks, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — ميكس استيكس، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0240",
      "categoryId": "cat-16",
      "price": 40,
      "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Fresh Jalapeño",
        "ar": "هالبينو فريش"
      },
      "desc": {
        "en": "Fresh Jalapeño, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "هالبينو فريش يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0241",
      "categoryId": "cat-16",
      "price": 75,
      "image": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Basmati Rice",
        "ar": "ارز بسمتي"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Basmati Rice, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — ارز بسمتي، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0242",
      "categoryId": "cat-16",
      "price": 165,
      "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Strips Fries",
        "ar": "فرايز تشيكن استربس"
      },
      "desc": {
        "en": "Chicken Strips Fries, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "فرايز تشيكن استربس يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0243",
      "categoryId": "cat-17",
      "price": 175,
      "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Crispy Shrimp Sandwich",
        "ar": "جمبرى كرسبي سندوتش"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Crispy Shrimp Sandwich, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — جمبرى كرسبي سندوتش، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0244",
      "categoryId": "cat-17",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Grilled Firekta Sandwich",
        "ar": "فايركتا مشوى سندوتش"
      },
      "desc": {
        "en": "Grilled Firekta Sandwich, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "فايركتا مشوى سندوتش يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0245",
      "categoryId": "cat-18",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Cream Soup",
        "ar": "شوربة كريمة فراخ"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Chicken Cream Soup, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — شوربة كريمة فراخ، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0246",
      "categoryId": "cat-18",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken & Mushroom Cream Soup",
        "ar": "شوربة كريمة (دجاج-ماشروم)"
      },
      "desc": {
        "en": "Chicken & Mushroom Cream Soup, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "شوربة كريمة (دجاج-ماشروم) يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0247",
      "categoryId": "cat-18",
      "price": 175,
      "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Seafood Soup",
        "ar": "شوربة سى فوود"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Seafood Soup, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — شوربة سى فوود، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0248",
      "categoryId": "cat-19",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Pane Sandwich",
        "ar": "بانية سندوتش"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Pane Sandwich, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بانية سندوتش، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0249",
      "categoryId": "cat-19",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Super Crunchy Sandwich",
        "ar": "سوبر كرانشي سندوتش"
      },
      "desc": {
        "en": "Super Crunchy Sandwich, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "سوبر كرانشي سندوتش يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0250",
      "categoryId": "cat-19",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Shish Tawook Sandwich",
        "ar": "شيش طاووق سندوتش"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Shish Tawook Sandwich, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — شيش طاووق سندوتش، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0251",
      "categoryId": "cat-19",
      "price": 135,
      "image": "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Shawarma",
        "ar": "شاورما دجاج"
      },
      "desc": {
        "en": "Chicken Shawarma, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "شاورما دجاج يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0252",
      "categoryId": "cat-19",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Zinger Supreme Sandwich",
        "ar": "زنجر سوبريم سندوتش"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Zinger Supreme Sandwich, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — زنجر سوبريم سندوتش، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0253",
      "categoryId": "cat-19",
      "price": 135,
      "image": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Fajita Sandwich",
        "ar": "فاهيتا دجاج سندوتش"
      },
      "desc": {
        "en": "Chicken Fajita Sandwich, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "فاهيتا دجاج سندوتش يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0254",
      "categoryId": "cat-19",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Crispino Sandwich",
        "ar": "كرسبينو سندوتش"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Crispino Sandwich, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — كرسبينو سندوتش، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0255",
      "categoryId": "cat-19",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cordon Bleu Sandwich",
        "ar": "كوردن بلو سندوتش"
      },
      "desc": {
        "en": "Cordon Bleu Sandwich, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "كوردن بلو سندوتش يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0256",
      "categoryId": "cat-19",
      "price": 155,
      "image": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Pollo",
        "ar": "لاتينو بولو"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Latino Pollo, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — لاتينو بولو، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0257",
      "categoryId": "cat-19",
      "price": 240,
      "image": "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken & Beef Loaf",
        "ar": "رغيف تشيكن بيف"
      },
      "desc": {
        "en": "Chicken & Beef Loaf, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "رغيف تشيكن بيف يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0258",
      "categoryId": "cat-20",
      "price": 200,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Grilled Steak Pizza",
        "ar": "استيك مشوى البيتزا وسط"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Medium Grilled Steak Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — استيك مشوى البيتزا وسط، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0259",
      "categoryId": "cat-20",
      "price": 185,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Bolognese Pizza",
        "ar": "بيتزا بولونيز وسط"
      },
      "desc": {
        "en": "Medium Bolognese Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا بولونيز وسط يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0260",
      "categoryId": "cat-20",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Pepperoni Pizza",
        "ar": "بيتزا بيبرونى وسط"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Medium Pepperoni Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيتزا بيبرونى وسط، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0261",
      "categoryId": "cat-20",
      "price": 185,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Chicken Ranch Pizza",
        "ar": "بيتزا تشيكن رانش وسط"
      },
      "desc": {
        "en": "Medium Chicken Ranch Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا تشيكن رانش وسط يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0262",
      "categoryId": "cat-20",
      "price": 145,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Vegetables Pizza",
        "ar": "بيتزا خضروات وسط"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Medium Vegetables Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيتزا خضروات وسط، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0263",
      "categoryId": "cat-20",
      "price": 180,
      "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Oriental Sausage Pizza",
        "ar": "بيتزا سجق شرقي وسط"
      },
      "desc": {
        "en": "Medium Oriental Sausage Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا سجق شرقي وسط يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0264",
      "categoryId": "cat-20",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Salami Pizza",
        "ar": "بيتزا سلامى وسط"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Medium Salami Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيتزا سلامى وسط، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0265",
      "categoryId": "cat-20",
      "price": 185,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Chicken BBQ Pizza",
        "ar": "تشكن بربكيو البيتزا وسط"
      },
      "desc": {
        "en": "Medium Chicken BBQ Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "تشكن بربكيو البيتزا وسط يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0266",
      "categoryId": "cat-20",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Medium Latino Oriental Pizza",
        "ar": "بيتزا لاتينو اورينتال وسط"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Medium Latino Oriental Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيتزا لاتينو اورينتال وسط، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0267",
      "categoryId": "cat-20",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Cheese Lovers Pizza",
        "ar": "تشيز لافرز البيتزا وسط"
      },
      "desc": {
        "en": "Medium Cheese Lovers Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "تشيز لافرز البيتزا وسط يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0268",
      "categoryId": "cat-20",
      "price": 200,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Chicken Festival Pizza",
        "ar": "بيتزا تشكن فيستفال وسط"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Medium Chicken Festival Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيتزا تشكن فيستفال وسط، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0269",
      "categoryId": "cat-20",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Medium Latino Supreme Pizza",
        "ar": "بيتزا لاتينو سوبريم وسط"
      },
      "desc": {
        "en": "Medium Latino Supreme Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا لاتينو سوبريم وسط يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0270",
      "categoryId": "cat-20",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Zinger Chili Pizza",
        "ar": "زنجر شيلي البيتزا وسط"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Medium Zinger Chili Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — زنجر شيلي البيتزا وسط، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0271",
      "categoryId": "cat-20",
      "price": 175,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Shish Tawook Pizza",
        "ar": "شيش طاووق بيتزا وسط"
      },
      "desc": {
        "en": "Medium Shish Tawook Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "شيش طاووق بيتزا وسط يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0272",
      "categoryId": "cat-20",
      "price": 195,
      "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Beef Shawarma Pizza",
        "ar": "شاورما لحم البيتزا وسط"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Medium Beef Shawarma Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — شاورما لحم البيتزا وسط، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0273",
      "categoryId": "cat-20",
      "price": 170,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Funghi Pizza",
        "ar": "فونجى البيتزا وسط"
      },
      "desc": {
        "en": "Medium Funghi Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "فونجى البيتزا وسط يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0274",
      "categoryId": "cat-20",
      "price": 185,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Chicken Fajita Pizza",
        "ar": "فهيتا فراخ البيتزا وسط"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Medium Chicken Fajita Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — فهيتا فراخ البيتزا وسط، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0275",
      "categoryId": "cat-20",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Beef Deluxe Pizza",
        "ar": "بيتزا بيف ديلوكس وسط"
      },
      "desc": {
        "en": "Medium Beef Deluxe Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا بيف ديلوكس وسط يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0276",
      "categoryId": "cat-20",
      "price": 195,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Max Pastrami Pizza",
        "ar": "ماكس بسطرمة البيتزا وسط"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Medium Max Pastrami Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — ماكس بسطرمة البيتزا وسط، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0277",
      "categoryId": "cat-20",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Margherita Pizza",
        "ar": "مرجريتا البيتزا وسط"
      },
      "desc": {
        "en": "Medium Margherita Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "مرجريتا البيتزا وسط يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0278",
      "categoryId": "cat-20",
      "price": 175,
      "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Hot Dog Pizza",
        "ar": "هوت دوج البيتزا وسط"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Medium Hot Dog Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — هوت دوج البيتزا وسط، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0279",
      "categoryId": "cat-20",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Mexican Pizza",
        "ar": "بيتزا مكسيكان وسط"
      },
      "desc": {
        "en": "Medium Mexican Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا مكسيكان وسط يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0280",
      "categoryId": "cat-20",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Crunchy Pizza",
        "ar": "بيتزا كرانشي وسط"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Medium Crunchy Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيتزا كرانشي وسط، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0281",
      "categoryId": "cat-20",
      "price": 200,
      "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Medium Chicken Mix Pizza",
        "ar": "بيتزا تشيكن ميكس وسط"
      },
      "desc": {
        "en": "Medium Chicken Mix Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا تشيكن ميكس وسط يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0282",
      "categoryId": "cat-21",
      "price": 220,
      "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Grilled Steak Pizza",
        "ar": "استيك مشوى البيتزا كبير"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Grilled Steak Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — استيك مشوى البيتزا كبير، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0283",
      "categoryId": "cat-21",
      "price": 235,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Pizza of Your Choice",
        "ar": "بيتزا اختيارك"
      },
      "desc": {
        "en": "Large Pizza of Your Choice, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا اختيارك يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0284",
      "categoryId": "cat-21",
      "price": 230,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Burger Pizza",
        "ar": "بيتزا برجر"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Burger Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيتزا برجر، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0285",
      "categoryId": "cat-21",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Bolognese Pizza",
        "ar": "بيتزا بولونيز كبير"
      },
      "desc": {
        "en": "Large Bolognese Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا بولونيز كبير يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0286",
      "categoryId": "cat-21",
      "price": 215,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Pepperoni Pizza",
        "ar": "بيتزا بيبرونى كبير"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Pepperoni Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيتزا بيبرونى كبير، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0287",
      "categoryId": "cat-21",
      "price": 225,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Chicken Mix Pizza",
        "ar": "بيتزا تشيكن ميكس"
      },
      "desc": {
        "en": "Large Chicken Mix Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا تشيكن ميكس يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0288",
      "categoryId": "cat-21",
      "price": 330,
      "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Crispy Shrimp Pizza",
        "ar": "بيتزا جمبري كرسبي كبير"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Crispy Shrimp Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيتزا جمبري كرسبي كبير، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0289",
      "categoryId": "cat-21",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Chicken Ranch Pizza",
        "ar": "بيتزا تشيكن رانش كبير"
      },
      "desc": {
        "en": "Large Chicken Ranch Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا تشيكن رانش كبير يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0290",
      "categoryId": "cat-21",
      "price": 165,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Vegetables Pizza",
        "ar": "بيتزا خضروات كبير"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Vegetables Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيتزا خضروات كبير، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0291",
      "categoryId": "cat-21",
      "price": 205,
      "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Oriental Sausage Pizza",
        "ar": "بيتزا سجق شرقي كبير"
      },
      "desc": {
        "en": "Large Oriental Sausage Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا سجق شرقي كبير يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0292",
      "categoryId": "cat-21",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Chicken BBQ Pizza",
        "ar": "تشكن بربكيو البيتزا كبير"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Chicken BBQ Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — تشكن بربكيو البيتزا كبير، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0293",
      "categoryId": "cat-21",
      "price": 220,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Chicken Festival Pizza",
        "ar": "بيتزا تشكن فيستفال كبير"
      },
      "desc": {
        "en": "Large Chicken Festival Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا تشكن فيستفال كبير يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0294",
      "categoryId": "cat-21",
      "price": 215,
      "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Cheese Lovers Pizza",
        "ar": "تشيز لافرز البيتزا كبير"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Cheese Lovers Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — تشيز لافرز البيتزا كبير، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0295",
      "categoryId": "cat-21",
      "price": 220,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Tuna Pizza",
        "ar": "تونة البيتزا كبير"
      },
      "desc": {
        "en": "Large Tuna Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "تونة البيتزا كبير يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0296",
      "categoryId": "cat-21",
      "price": 320,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Shrimp Ranch Pizza",
        "ar": "بيتزا جمبري رانش كبير"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Shrimp Ranch Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيتزا جمبري رانش كبير، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0297",
      "categoryId": "cat-21",
      "price": 240,
      "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Large Latino Supreme Pizza",
        "ar": "بيتزا لاتينو سوبريم كبير"
      },
      "desc": {
        "en": "Large Latino Supreme Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا لاتينو سوبريم كبير يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0298",
      "categoryId": "cat-21",
      "price": 215,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Zinger Chili Pizza",
        "ar": "زنجر تشيلي البيتزا كبير"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Zinger Chili Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — زنجر تشيلي البيتزا كبير، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0299",
      "categoryId": "cat-21",
      "price": 340,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Seafood Pizza",
        "ar": "سى فوود البيتزا"
      },
      "desc": {
        "en": "Large Seafood Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "سى فوود البيتزا يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0300",
      "categoryId": "cat-21",
      "price": 200,
      "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Shish Tawook Pizza",
        "ar": "شيش طاووق بيتزا كبير"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Shish Tawook Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — شيش طاووق بيتزا كبير، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0301",
      "categoryId": "cat-21",
      "price": 220,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Beef Shawarma Pizza",
        "ar": "شاورما لحم البيتزا كبير"
      },
      "desc": {
        "en": "Large Beef Shawarma Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "شاورما لحم البيتزا كبير يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0302",
      "categoryId": "cat-21",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Chicken Fajita Pizza",
        "ar": "فهيتا فراخ البيتزا كبير"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Chicken Fajita Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — فهيتا فراخ البيتزا كبير، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0303",
      "categoryId": "cat-21",
      "price": 235,
      "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Beef Deluxe Pizza",
        "ar": "بيف ديلوكس البيتزا كبير"
      },
      "desc": {
        "en": "Large Beef Deluxe Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيف ديلوكس البيتزا كبير يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0304",
      "categoryId": "cat-21",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Funghi Pizza",
        "ar": "فونجى البيتزا كبير"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Funghi Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — فونجى البيتزا كبير، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0305",
      "categoryId": "cat-21",
      "price": 215,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Max Pastrami Pizza",
        "ar": "ماكس بسطرمة البيتزا كبير"
      },
      "desc": {
        "en": "Large Max Pastrami Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "ماكس بسطرمة البيتزا كبير يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0306",
      "categoryId": "cat-21",
      "price": 200,
      "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Hot Dog Pizza",
        "ar": "هوت دوج البيتزا كبير"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Hot Dog Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — هوت دوج البيتزا كبير، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0307",
      "categoryId": "cat-21",
      "price": 160,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Margherita Pizza",
        "ar": "مرجريتا البيتزا كبير"
      },
      "desc": {
        "en": "Large Margherita Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "مرجريتا البيتزا كبير يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0308",
      "categoryId": "cat-21",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Mexican Pizza",
        "ar": "بيتزا مكسيكان"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Large Mexican Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيتزا مكسيكان، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0309",
      "categoryId": "cat-21",
      "price": 215,
      "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Large Crunchy Pizza",
        "ar": "بيتزا كرانشي كبير"
      },
      "desc": {
        "en": "Large Crunchy Pizza, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "بيتزا كرانشي كبير يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0310",
      "categoryId": "cat-22",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Frappuccino",
        "ar": "فرابتشىينو"
      },
      "desc": {
        "en": "Freshly made Frappuccino, blended to order — the perfect refreshment.",
        "ar": "فرابتشىينو طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0311",
      "categoryId": "cat-22",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Caramel Macchiato",
        "ar": "ايس كراميل ميكاتو"
      },
      "desc": {
        "en": "Iced Caramel Macchiato, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ايس كراميل ميكاتو يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0312",
      "categoryId": "cat-22",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Mocha",
        "ar": "ايس موكا"
      },
      "desc": {
        "en": "Freshly made Iced Mocha, blended to order — the perfect refreshment.",
        "ar": "ايس موكا طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0313",
      "categoryId": "cat-22",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Double Chocolate Mocha",
        "ar": "دبل شوكليت موكا"
      },
      "desc": {
        "en": "Double Chocolate Mocha, prepared fresh with quality ingredients. Served chilled.",
        "ar": "دبل شوكليت موكا يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0314",
      "categoryId": "cat-22",
      "price": 85,
      "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Latte",
        "ar": "ايس لاتيه"
      },
      "desc": {
        "en": "Freshly made Iced Latte, blended to order — the perfect refreshment.",
        "ar": "ايس لاتيه طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0315",
      "categoryId": "cat-22",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Lotus Latte",
        "ar": "ايس لوتس لاتيه"
      },
      "desc": {
        "en": "Iced Lotus Latte, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ايس لوتس لاتيه يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0316",
      "categoryId": "cat-22",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Spanish Latte",
        "ar": "ايس سبانش لاتيه"
      },
      "desc": {
        "en": "Freshly made Iced Spanish Latte, blended to order — the perfect refreshment.",
        "ar": "ايس سبانش لاتيه طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0317",
      "categoryId": "cat-22",
      "price": 85,
      "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Americano",
        "ar": "ايس امريكانو"
      },
      "desc": {
        "en": "Iced Americano, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ايس امريكانو يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0318",
      "categoryId": "cat-23",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Lotus Waffle",
        "ar": "لوتس"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Lotus Waffle, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — لوتس، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0319",
      "categoryId": "cat-23",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Strawberry Waffle",
        "ar": "فراوله"
      },
      "desc": {
        "en": "Strawberry Waffle, our homemade dessert prepared fresh every day.",
        "ar": "فراوله من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0320",
      "categoryId": "cat-23",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Nutella Waffle",
        "ar": "نوتيلا"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Nutella Waffle, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — نوتيلا، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0321",
      "categoryId": "cat-23",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "White Nutella Waffle",
        "ar": "وايت نوتيلا"
      },
      "desc": {
        "en": "White Nutella Waffle, our homemade dessert prepared fresh every day.",
        "ar": "وايت نوتيلا من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0322",
      "categoryId": "cat-23",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Nutella Mix Waffle",
        "ar": "ميكس نوتيلا"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Nutella Mix Waffle, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — ميكس نوتيلا، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0323",
      "categoryId": "cat-23",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chocolate Waffle",
        "ar": "شوكليت"
      },
      "desc": {
        "en": "Chocolate Waffle, our homemade dessert prepared fresh every day.",
        "ar": "شوكليت من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0324",
      "categoryId": "cat-23",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Caramel Waffle",
        "ar": "كراميل"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Caramel Waffle, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — كراميل، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0325",
      "categoryId": "cat-23",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Oreo Waffle",
        "ar": "اوريو"
      },
      "desc": {
        "en": "Oreo Waffle, our homemade dessert prepared fresh every day.",
        "ar": "اوريو من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0326",
      "categoryId": "cat-23",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hazelnut Chocolate Waffle",
        "ar": "شيكولاته بندق"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Hazelnut Chocolate Waffle, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — شيكولاته بندق، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0327",
      "categoryId": "cat-23",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Blueberry Waffle",
        "ar": "توت ازرق"
      },
      "desc": {
        "en": "Blueberry Waffle, our homemade dessert prepared fresh every day.",
        "ar": "توت ازرق من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0328",
      "categoryId": "cat-23",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Kinder Latino Waffle",
        "ar": "كيندر لاتينو"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Kinder Latino Waffle, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — كيندر لاتينو، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0329",
      "categoryId": "cat-23",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Berry Mix Waffle",
        "ar": "ميكس بيري"
      },
      "desc": {
        "en": "Berry Mix Waffle, our homemade dessert prepared fresh every day.",
        "ar": "ميكس بيري من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0330",
      "categoryId": "cat-23",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Half & Half Waffle",
        "ar": "هاف اند هاف"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Half & Half Waffle, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — هاف اند هاف، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0331",
      "categoryId": "cat-23",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Four Seasons Waffle",
        "ar": "فور سيزون"
      },
      "desc": {
        "en": "Four Seasons Waffle, our homemade dessert prepared fresh every day.",
        "ar": "فور سيزون من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0332",
      "categoryId": "cat-23",
      "price": 160,
      "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Waffle with Ice Cream of Your Choice",
        "ar": "وافل لاتينو اختيارك ايس كريم"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Latino Waffle with Ice Cream of Your Choice, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — وافل لاتينو اختيارك ايس كريم، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0333",
      "categoryId": "cat-24",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Strawberry Yogurt",
        "ar": "فراوله"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Strawberry Yogurt, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — فراوله، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0334",
      "categoryId": "cat-24",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Blueberry Yogurt",
        "ar": "توت ازرق"
      },
      "desc": {
        "en": "Blueberry Yogurt, our homemade dessert prepared fresh every day.",
        "ar": "توت ازرق من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0335",
      "categoryId": "cat-24",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Red Berry Yogurt",
        "ar": "توت احمر"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Red Berry Yogurt, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — توت احمر، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0336",
      "categoryId": "cat-24",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Peach Yogurt",
        "ar": "خوخ"
      },
      "desc": {
        "en": "Peach Yogurt, our homemade dessert prepared fresh every day.",
        "ar": "خوخ من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0337",
      "categoryId": "cat-24",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Kiwi Yogurt",
        "ar": "كيوي"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Kiwi Yogurt, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — كيوي، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0338",
      "categoryId": "cat-25",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Blue Sky Smoothie",
        "ar": "بلو سكاي سموزي"
      },
      "desc": {
        "en": "Freshly made Blue Sky Smoothie, blended to order — the perfect refreshment.",
        "ar": "بلو سكاي سموزي طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0339",
      "categoryId": "cat-25",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Wild Latino Smoothie",
        "ar": "وايلد لاتينو سموزي"
      },
      "desc": {
        "en": "Wild Latino Smoothie, prepared fresh with quality ingredients. Served chilled.",
        "ar": "وايلد لاتينو سموزي يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0340",
      "categoryId": "cat-25",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mint Berry Smoothie",
        "ar": "مينت بيري سموزي"
      },
      "desc": {
        "en": "Freshly made Mint Berry Smoothie, blended to order — the perfect refreshment.",
        "ar": "مينت بيري سموزي طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0341",
      "categoryId": "cat-26",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Vanilla Coffee Frappé",
        "ar": "كوفي فرابيه فانيليا"
      },
      "desc": {
        "en": "Freshly made Vanilla Coffee Frappé, blended to order — the perfect refreshment.",
        "ar": "كوفي فرابيه فانيليا طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0342",
      "categoryId": "cat-26",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Caramel Coffee Frappé",
        "ar": "كوفي فرابيه كراميل"
      },
      "desc": {
        "en": "Caramel Coffee Frappé, prepared fresh with quality ingredients. Served chilled.",
        "ar": "كوفي فرابيه كراميل يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0343",
      "categoryId": "cat-26",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mocha Frappé",
        "ar": "موكا فرابيه"
      },
      "desc": {
        "en": "Freshly made Mocha Frappé, blended to order — the perfect refreshment.",
        "ar": "موكا فرابيه طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0344",
      "categoryId": "cat-26",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Oreo Frappé",
        "ar": "اوريو فرابيه"
      },
      "desc": {
        "en": "Oreo Frappé, prepared fresh with quality ingredients. Served chilled.",
        "ar": "اوريو فرابيه يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0345",
      "categoryId": "cat-26",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Lotus Frappé",
        "ar": "لوتس فرابيه"
      },
      "desc": {
        "en": "Freshly made Lotus Frappé, blended to order — the perfect refreshment.",
        "ar": "لوتس فرابيه طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0346",
      "categoryId": "cat-26",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "White Mocha Frappé",
        "ar": "وايت موكا فرابيه"
      },
      "desc": {
        "en": "White Mocha Frappé, prepared fresh with quality ingredients. Served chilled.",
        "ar": "وايت موكا فرابيه يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0347",
      "categoryId": "cat-26",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chocolate Frappé",
        "ar": "فرابيه شوكليت"
      },
      "desc": {
        "en": "Freshly made Chocolate Frappé, blended to order — the perfect refreshment.",
        "ar": "فرابيه شوكليت طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0348",
      "categoryId": "cat-26",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Vanilla Frappé",
        "ar": "فرابيه فانيليا"
      },
      "desc": {
        "en": "Vanilla Frappé, prepared fresh with quality ingredients. Served chilled.",
        "ar": "فرابيه فانيليا يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0349",
      "categoryId": "cat-27",
      "price": 95,
      "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mango Juice",
        "ar": "مانجو"
      },
      "desc": {
        "en": "Freshly made Mango Juice, blended to order — the perfect refreshment.",
        "ar": "مانجو طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0350",
      "categoryId": "cat-27",
      "price": 85,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Strawberry Juice",
        "ar": "فراوله"
      },
      "desc": {
        "en": "Strawberry Juice, prepared fresh with quality ingredients. Served chilled.",
        "ar": "فراوله يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0351",
      "categoryId": "cat-27",
      "price": 80,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Guava Juice",
        "ar": "جوافه"
      },
      "desc": {
        "en": "Freshly made Guava Juice, blended to order — the perfect refreshment.",
        "ar": "جوافه طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0352",
      "categoryId": "cat-27",
      "price": 85,
      "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Banana Juice",
        "ar": "موز"
      },
      "desc": {
        "en": "Banana Juice, prepared fresh with quality ingredients. Served chilled.",
        "ar": "موز يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0353",
      "categoryId": "cat-27",
      "price": 80,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Orange Juice",
        "ar": "برتقال"
      },
      "desc": {
        "en": "Freshly made Orange Juice, blended to order — the perfect refreshment.",
        "ar": "برتقال طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0354",
      "categoryId": "cat-27",
      "price": 85,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mandarin Juice",
        "ar": "يوسفي"
      },
      "desc": {
        "en": "Mandarin Juice, prepared fresh with quality ingredients. Served chilled.",
        "ar": "يوسفي يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0355",
      "categoryId": "cat-27",
      "price": 70,
      "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Lemon Juice",
        "ar": "ليمون"
      },
      "desc": {
        "en": "Freshly made Lemon Juice, blended to order — the perfect refreshment.",
        "ar": "ليمون طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0356",
      "categoryId": "cat-27",
      "price": 80,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Lemon & Mint Juice",
        "ar": "ليمون نعناع"
      },
      "desc": {
        "en": "Lemon & Mint Juice, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ليمون نعناع يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0357",
      "categoryId": "cat-27",
      "price": 85,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Watermelon Juice",
        "ar": "بطيخ"
      },
      "desc": {
        "en": "Freshly made Watermelon Juice, blended to order — the perfect refreshment.",
        "ar": "بطيخ طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0358",
      "categoryId": "cat-27",
      "price": 110,
      "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Kiwi Juice",
        "ar": "كيوي"
      },
      "desc": {
        "en": "Kiwi Juice, prepared fresh with quality ingredients. Served chilled.",
        "ar": "كيوي يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0359",
      "categoryId": "cat-27",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Kiwi Mango Juice",
        "ar": "كيوي مانجو"
      },
      "desc": {
        "en": "Freshly made Kiwi Mango Juice, blended to order — the perfect refreshment.",
        "ar": "كيوي مانجو طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0360",
      "categoryId": "cat-27",
      "price": 90,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Dates & Milk Juice",
        "ar": "بلح حليب"
      },
      "desc": {
        "en": "Dates & Milk Juice, prepared fresh with quality ingredients. Served chilled.",
        "ar": "بلح حليب يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0361",
      "categoryId": "cat-27",
      "price": 80,
      "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Pomegranate Juice",
        "ar": "رمان"
      },
      "desc": {
        "en": "Freshly made Pomegranate Juice, blended to order — the perfect refreshment.",
        "ar": "رمان طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0362",
      "categoryId": "cat-27",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Avocado Smoothie",
        "ar": "افوكادو"
      },
      "desc": {
        "en": "Avocado Smoothie, prepared fresh with quality ingredients. Served chilled.",
        "ar": "افوكادو يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0363",
      "categoryId": "cat-28",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Florida Cocktail",
        "ar": "فلوريدا"
      },
      "desc": {
        "en": "Freshly made Florida Cocktail, blended to order — the perfect refreshment.",
        "ar": "فلوريدا طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0364",
      "categoryId": "cat-28",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Power Latino Cocktail",
        "ar": "باور لاتينو"
      },
      "desc": {
        "en": "Power Latino Cocktail, prepared fresh with quality ingredients. Served chilled.",
        "ar": "باور لاتينو يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0365",
      "categoryId": "cat-28",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Tropicana Cocktail",
        "ar": "تروبيكانا"
      },
      "desc": {
        "en": "Freshly made Tropicana Cocktail, blended to order — the perfect refreshment.",
        "ar": "تروبيكانا طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0366",
      "categoryId": "cat-28",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hawaii Cocktail",
        "ar": "هاواي"
      },
      "desc": {
        "en": "Hawaii Cocktail, prepared fresh with quality ingredients. Served chilled.",
        "ar": "هاواي يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0367",
      "categoryId": "cat-28",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Fresh Cocktail",
        "ar": "لاتينو فريش"
      },
      "desc": {
        "en": "Freshly made Latino Fresh Cocktail, blended to order — the perfect refreshment.",
        "ar": "لاتينو فريش طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0368",
      "categoryId": "cat-28",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Strawberry Banana Cocktail",
        "ar": "ستروبري بنانا"
      },
      "desc": {
        "en": "Strawberry Banana Cocktail, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ستروبري بنانا يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0369",
      "categoryId": "cat-29",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mango Kiwi Yogurt",
        "ar": "زبادي مانجو كيوي"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Mango Kiwi Yogurt, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — زبادي مانجو كيوي، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0370",
      "categoryId": "cat-29",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mango Strawberry Yogurt",
        "ar": "زبادي مانجو فراوله"
      },
      "desc": {
        "en": "Mango Strawberry Yogurt, our homemade dessert prepared fresh every day.",
        "ar": "زبادي مانجو فراوله من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0371",
      "categoryId": "cat-29",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Wild Berries Yogurt",
        "ar": "زبادي فواكه بريه"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Wild Berries Yogurt, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — زبادي فواكه بريه، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0372",
      "categoryId": "cat-29",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Berry Mix Yogurt",
        "ar": "زبادي ميكس بيري"
      },
      "desc": {
        "en": "Berry Mix Yogurt, our homemade dessert prepared fresh every day.",
        "ar": "زبادي ميكس بيري من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0373",
      "categoryId": "cat-29",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Strawberry Banana Yogurt",
        "ar": "زبادي فراوله موز"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Strawberry Banana Yogurt, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — زبادي فراوله موز، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0374",
      "categoryId": "cat-30",
      "price": 50,
      "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Strawberry Scoop",
        "ar": "بوله فراوله"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Strawberry Scoop, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — بوله فراوله، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0375",
      "categoryId": "cat-30",
      "price": 50,
      "image": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mango Scoop",
        "ar": "بوله مانجو"
      },
      "desc": {
        "en": "Mango Scoop, our homemade dessert prepared fresh every day.",
        "ar": "بوله مانجو من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0376",
      "categoryId": "cat-30",
      "price": 50,
      "image": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chocolate Scoop",
        "ar": "يوله شيكولانه"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Chocolate Scoop, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — يوله شيكولانه، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0377",
      "categoryId": "cat-30",
      "price": 50,
      "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Yogurt Scoop",
        "ar": "بوله زبادي"
      },
      "desc": {
        "en": "Yogurt Scoop, our homemade dessert prepared fresh every day.",
        "ar": "بوله زبادي من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0378",
      "categoryId": "cat-30",
      "price": 50,
      "image": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Vanilla Scoop",
        "ar": "فانيلبا بوله"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Vanilla Scoop, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — فانيلبا بوله، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0379",
      "categoryId": "cat-30",
      "price": 230,
      "image": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Brownies Madness",
        "ar": "براونيز مادنس"
      },
      "desc": {
        "en": "Brownies Madness, our homemade dessert prepared fresh every day.",
        "ar": "براونيز مادنس من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0380",
      "categoryId": "cat-30",
      "price": 200,
      "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Oreo Madness",
        "ar": "أوريو مادنس"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Oreo Madness, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — أوريو مادنس، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0381",
      "categoryId": "cat-30",
      "price": 230,
      "image": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cheese Madness",
        "ar": "تشيز مادنس"
      },
      "desc": {
        "en": "Cheese Madness, our homemade dessert prepared fresh every day.",
        "ar": "تشيز مادنس من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0382",
      "categoryId": "cat-31",
      "price": 300,
      "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Cassata",
        "ar": "كاساتا"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Cassata, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — كاساتا، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0383",
      "categoryId": "cat-31",
      "price": 350,
      "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Tree Trunk",
        "ar": "جزع الشجر"
      },
      "desc": {
        "en": "Tree Trunk, our homemade dessert prepared fresh every day.",
        "ar": "جزع الشجر من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0384",
      "categoryId": "cat-31",
      "price": 370,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Berry Yogurt Heart",
        "ar": "قلب زبادي توت"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Berry Yogurt Heart, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — قلب زبادي توت، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0385",
      "categoryId": "cat-31",
      "price": 350,
      "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Carnival",
        "ar": "كرنفال"
      },
      "desc": {
        "en": "Carnival, our homemade dessert prepared fresh every day.",
        "ar": "كرنفال من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0386",
      "categoryId": "cat-31",
      "price": 380,
      "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Fruit Heart",
        "ar": "قلب فواكهه"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Fruit Heart, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — قلب فواكهه، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0387",
      "categoryId": "cat-31",
      "price": 350,
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Black Forest",
        "ar": "بلاك فورست"
      },
      "desc": {
        "en": "Black Forest, our homemade dessert prepared fresh every day.",
        "ar": "بلاك فورست من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0388",
      "categoryId": "cat-31",
      "price": 370,
      "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Volcano",
        "ar": "بركان لاتينو"
      },
      "desc": {
        "en": "A sweet Latinoo Max treat — Latino Volcano, made fresh in-house daily.",
        "ar": "حلوى لاتينو ماكس — بركان لاتينو، تُصنع طازجة في مطبخنا يومياً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0389",
      "categoryId": "cat-31",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Torta Show",
        "ar": "تورته شو"
      },
      "desc": {
        "en": "Torta Show, our homemade dessert prepared fresh every day.",
        "ar": "تورته شو من حلوياتنا المنزلية تُحضَّر طازجة كل يوم."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0390",
      "categoryId": "cat-32",
      "price": 310,
      "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "special"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Beef Fajita Sizzler",
        "ar": "وجبه بيف فاهيتا"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Beef Fajita Sizzler, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — وجبه بيف فاهيتا، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0391",
      "categoryId": "cat-32",
      "price": 290,
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "special"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Fajita Sizzler",
        "ar": "تشيكن فاهيتا وجبه"
      },
      "desc": {
        "en": "Chicken Fajita Sizzler, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "تشيكن فاهيتا وجبه يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0392",
      "categoryId": "cat-32",
      "price": 320,
      "image": "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "special"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Escalito Burger",
        "ar": "اسكلتو برجر"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Escalito Burger, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — اسكلتو برجر، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0393",
      "categoryId": "cat-32",
      "price": 340,
      "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "special"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mixed Fajita Sizzler",
        "ar": "فاهيتا ميكس"
      },
      "desc": {
        "en": "Mixed Fajita Sizzler, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "فاهيتا ميكس يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0394",
      "categoryId": "cat-33",
      "price": 280,
      "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Grilled Shish Tawook Meal",
        "ar": "شيش طاووق مشوي وجبه"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Grilled Shish Tawook Meal, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — شيش طاووق مشوي وجبه، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0395",
      "categoryId": "cat-34",
      "price": 300,
      "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Ramadan Chicken Meal",
        "ar": "وجبات الدجاج الرمضانيه"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Ramadan Chicken Meal, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — وجبات الدجاج الرمضانيه، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0396",
      "categoryId": "cat-34",
      "price": 375,
      "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Ramadan Meat Meal",
        "ar": "وجبات اللحوم الرمضانيه"
      },
      "desc": {
        "en": "Ramadan Meat Meal, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "وجبات اللحوم الرمضانيه يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0397",
      "categoryId": "cat-35",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hero Suhoor",
        "ar": "سحور البطل"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Hero Suhoor, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — سحور البطل، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0398",
      "categoryId": "cat-35",
      "price": 135,
      "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Special Suhoor",
        "ar": "سحور لاتينو اسبيشيال"
      },
      "desc": {
        "en": "Latino Special Suhoor, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "سحور لاتينو اسبيشيال يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0399",
      "categoryId": "cat-35",
      "price": 155,
      "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Max Suhoor",
        "ar": "سحور لاتينو ماكس"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Latino Max Suhoor, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — سحور لاتينو ماكس، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0400",
      "categoryId": "cat-36",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Smoky Latino",
        "ar": "سموكي لاتينو"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Smoky Latino, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — سموكي لاتينو، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0401",
      "categoryId": "cat-36",
      "price": 220,
      "image": "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Turkey Chicken Ranch",
        "ar": "تركي تشيكن رانش"
      },
      "desc": {
        "en": "Turkey Chicken Ranch, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "تركي تشيكن رانش يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0402",
      "categoryId": "cat-36",
      "price": 230,
      "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Fried & Cheese",
        "ar": "لاتينو فرايد اند تشيز"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Latino Fried & Cheese, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — لاتينو فرايد اند تشيز، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0403",
      "categoryId": "cat-36",
      "price": 230,
      "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Fried Crispy Mix Sticks",
        "ar": "فرايد كرسبي ميكس ستيكس"
      },
      "desc": {
        "en": "Fried Crispy Mix Sticks, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "فرايد كرسبي ميكس ستيكس يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0404",
      "categoryId": "cat-36",
      "price": 180,
      "image": "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Chicken Burger",
        "ar": "تشيكن برجر"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Chicken Burger, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — تشيكن برجر، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0405",
      "categoryId": "cat-36",
      "price": 220,
      "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mega Chicken Burger",
        "ar": "ميجا تشيكن برجر"
      },
      "desc": {
        "en": "Mega Chicken Burger, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "ميجا تشيكن برجر يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0406",
      "categoryId": "cat-36",
      "price": 260,
      "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "best"
      ],
      "featured": true,
      "available": true,
      "name": {
        "en": "Latino Pro Max",
        "ar": "لاتينو برو ماكس"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Latino Pro Max, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — لاتينو برو ماكس، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0407",
      "categoryId": "cat-37",
      "price": 100,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "new"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hot Matcha Latte",
        "ar": "هوت ماتشا لاتيه"
      },
      "desc": {
        "en": "Expertly brewed Hot Matcha Latte, served hot and fresh.",
        "ar": "هوت ماتشا لاتيه يُحضَّر بعناية ويُقدَّم ساخناً وطازجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0408",
      "categoryId": "cat-37",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "new"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Hot Spanish Matcha Latte",
        "ar": "هوت سبانش ماتشا لاتيه"
      },
      "desc": {
        "en": "Hot Spanish Matcha Latte, brewed to order with premium beans and ingredients.",
        "ar": "هوت سبانش ماتشا لاتيه يُحضَّر عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Hazelnut",
            "ar": "بندق"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Caramel",
            "ar": "كراميل"
          },
          "price": 30
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Chocolate",
            "ar": "شوكليت"
          },
          "price": 30
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Cinnamon",
            "ar": "قرفة"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0409",
      "categoryId": "cat-38",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "new"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Spanish Matcha Latte",
        "ar": "ايس سبانش ماتشا لاتيه"
      },
      "desc": {
        "en": "Freshly made Iced Spanish Matcha Latte, blended to order — the perfect refreshment.",
        "ar": "ايس سبانش ماتشا لاتيه طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0410",
      "categoryId": "cat-38",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "new"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Matcha Latte",
        "ar": "ايس ماتشا لاتيه"
      },
      "desc": {
        "en": "Iced Matcha Latte, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ايس ماتشا لاتيه يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0411",
      "categoryId": "cat-38",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "new"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Matcha Coconut",
        "ar": "ايس ماتشا كوكونت"
      },
      "desc": {
        "en": "Freshly made Iced Matcha Coconut, blended to order — the perfect refreshment.",
        "ar": "ايس ماتشا كوكونت طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0412",
      "categoryId": "cat-38",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "new"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Strawberry Matcha",
        "ar": "ايس ستروبري ماتشا"
      },
      "desc": {
        "en": "Iced Strawberry Matcha, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ايس ستروبري ماتشا يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0413",
      "categoryId": "cat-38",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "new"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Mango Matcha",
        "ar": "ايس مانجو ماتشا"
      },
      "desc": {
        "en": "Freshly made Iced Mango Matcha, blended to order — the perfect refreshment.",
        "ar": "ايس مانجو ماتشا طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0414",
      "categoryId": "cat-38",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "new"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Matcha Vanilla",
        "ar": "ايس ماتشا فانيليا"
      },
      "desc": {
        "en": "Iced Matcha Vanilla, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ايس ماتشا فانيليا يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0415",
      "categoryId": "cat-38",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "new"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Matcha Caramel",
        "ar": "ايس ماتشا كراميل"
      },
      "desc": {
        "en": "Freshly made Iced Matcha Caramel, blended to order — the perfect refreshment.",
        "ar": "ايس ماتشا كراميل طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0416",
      "categoryId": "cat-38",
      "price": 140,
      "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "new"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Iced Blue Croissant Matcha",
        "ar": "ايس بلو كرواسو ماتشا"
      },
      "desc": {
        "en": "Iced Blue Croissant Matcha, prepared fresh with quality ingredients. Served chilled.",
        "ar": "ايس بلو كرواسو ماتشا يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0417",
      "categoryId": "cat-38",
      "price": 70,
      "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "new"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Matcha Ice Cream Scoop",
        "ar": "بولة ايس كريم ماتشا"
      },
      "desc": {
        "en": "Freshly made Matcha Ice Cream Scoop, blended to order — the perfect refreshment.",
        "ar": "بولة ايس كريم ماتشا طازج يُحضَّر عند الطلب — انتعاش مثالي."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0418",
      "categoryId": "cat-38",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "new"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Matcha Frappé",
        "ar": "فرابيه ماتشا"
      },
      "desc": {
        "en": "Matcha Frappé, prepared fresh with quality ingredients. Served chilled.",
        "ar": "فرابيه ماتشا يُحضَّر طازجاً بمكونات عالية الجودة ويُقدَّم مثلجاً."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Milk",
            "ar": "اضافه حليب"
          },
          "price": 32
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Ice Cream Scoop",
            "ar": "بوله ايس كريم"
          },
          "price": 35
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Nutella",
            "ar": "نوتيلا"
          },
          "price": 45
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Whipped Cream",
            "ar": "ويبد كريم"
          },
          "price": 35
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Flavour",
            "ar": "فليفر"
          },
          "price": 30
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Nuts",
            "ar": "مكسرات"
          },
          "price": 40
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Fruits",
            "ar": "فواكه"
          },
          "price": 40
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Sauce",
            "ar": "صوص"
          },
          "price": 30
        }
      ]
    },
    {
      "id": "p-0419",
      "categoryId": "cat-39",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "badges": [],
      "featured": false,
      "available": true,
      "name": {
        "en": "Whole Grain Chicken Ranch Pizza",
        "ar": "بيتزا تشيكن رانش حبة كاملة"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Whole Grain Chicken Ranch Pizza, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — بيتزا تشيكن رانش حبة كاملة، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-8",
          "name": {
            "en": "Stuffed Crust",
            "ar": "استافت كراست اضافة"
          },
          "price": 45
        },
        {
          "id": "ex-9",
          "name": {
            "en": "Extra Pepperoni",
            "ar": "اضافه ببروني"
          },
          "price": 120
        }
      ]
    },
    {
      "id": "p-0420",
      "categoryId": "cat-40",
      "price": 90,
      "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "special"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Fries & Pepsi Combo",
        "ar": "كومبو بطاطس و بيبسي"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Fries & Pepsi Combo, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — كومبو بطاطس و بيبسي، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0421",
      "categoryId": "cat-40",
      "price": 130,
      "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "special"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Spring Combo",
        "ar": "كومبو سبرينج"
      },
      "desc": {
        "en": "Spring Combo, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "كومبو سبرينج يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0422",
      "categoryId": "cat-40",
      "price": 125,
      "image": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "special"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Mozzarella Sticks Combo",
        "ar": "كومبو موتزاريلا ستيكس"
      },
      "desc": {
        "en": "A Latinoo Max favourite — Mozzarella Sticks Combo, prepared fresh to order with premium ingredients.",
        "ar": "من أطباق لاتينو ماكس المميزة — كومبو موتزاريلا ستيكس، يُحضَّر طازجاً عند الطلب بمكونات فاخرة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    },
    {
      "id": "p-0423",
      "categoryId": "cat-40",
      "price": 70,
      "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
      "badges": [
        "special"
      ],
      "featured": false,
      "available": true,
      "name": {
        "en": "Coleslaw Combo",
        "ar": "كومبو كلوسلو"
      },
      "desc": {
        "en": "Coleslaw Combo, made fresh in our kitchen with quality ingredients and signature Latinoo flavour.",
        "ar": "كومبو كلوسلو يُحضَّر طازجاً في مطبخنا بمكونات عالية الجودة ونكهة لاتينو المميزة."
      },
      "sizes": [],
      "extras": [
        {
          "id": "ex-0",
          "name": {
            "en": "Extra Cheddar",
            "ar": "شيدر اضافة"
          },
          "price": 35
        },
        {
          "id": "ex-1",
          "name": {
            "en": "Extra Mozzarella",
            "ar": "موزاريلا اكسترا اضافة"
          },
          "price": 75
        },
        {
          "id": "ex-2",
          "name": {
            "en": "Extra Mushroom",
            "ar": "مشروم اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-3",
          "name": {
            "en": "Extra Jalapeño",
            "ar": "هالبينو اضافة"
          },
          "price": 25
        },
        {
          "id": "ex-4",
          "name": {
            "en": "Extra Cheese Sauce",
            "ar": "تشيز صوص اضافة"
          },
          "price": 40
        },
        {
          "id": "ex-5",
          "name": {
            "en": "Extra Ranch",
            "ar": "رانش اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-6",
          "name": {
            "en": "Extra BBQ",
            "ar": "بربكيو اضافة"
          },
          "price": 30
        },
        {
          "id": "ex-7",
          "name": {
            "en": "Extra Vegetables",
            "ar": "خضار اضافة"
          },
          "price": 35
        }
      ]
    }
  ],
  "offers": [
    {
      "id": "of-family",
      "type": "bundle",
      "active": true,
      "bundlePrice": 595,
      "originalPrice": 700,
      "productIds": [
        "p-0131",
        "p-0307",
        "p-0235",
        "p-0070",
        "p-0070"
      ],
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "start": "2026-11-01",
      "end": "2026-12-31",
      "title": {
        "en": "Family Feast Bundle",
        "ar": "عرض العائلة"
      },
      "desc": {
        "en": "Max Max + Large Margherita Pizza + Latino Texas Fries + 2 Cola Cans.",
        "ar": "ماكس ماكس + بيتزا مرجريتا كبيرة + لاتينو تكساس فرايز + 2 كولا كان."
      }
    },
    {
      "id": "of-duo",
      "type": "bundle",
      "active": true,
      "bundlePrice": 398,
      "originalPrice": 480,
      "productIds": [
        "p-0149",
        "p-0149",
        "p-0235",
        "p-0070",
        "p-0070"
      ],
      "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
      "start": "2026-11-10",
      "end": "2026-12-31",
      "title": {
        "en": "Duo Deal",
        "ar": "عرض الثنائي"
      },
      "desc": {
        "en": "2 Max Burgers + Latino Texas Fries + 2 Cola Cans. Perfect for two.",
        "ar": "2 ماكس برجر + لاتينو تكساس فرايز + 2 كولا كان. مثالي لشخصين."
      }
    },
    {
      "id": "of-burger20",
      "type": "percent",
      "discount": 20,
      "active": true,
      "productIds": [
        "p-0143",
        "p-0144",
        "p-0145",
        "p-0146",
        "p-0147",
        "p-0148",
        "p-0149",
        "p-0150",
        "p-0151",
        "p-0152",
        "p-0153",
        "p-0154"
      ],
      "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      "start": "2026-11-15",
      "end": "2026-12-15",
      "title": {
        "en": "Burger Mania — 20% Off",
        "ar": "جنون البرجر — خصم 20%"
      },
      "desc": {
        "en": "20% off all burgers, for a limited time only.",
        "ar": "خصم 20% على كل البرجر لفترة محدودة."
      }
    },
    {
      "id": "of-dessert30",
      "type": "percent",
      "discount": 30,
      "active": true,
      "productIds": [
        "p-0155",
        "p-0156",
        "p-0157",
        "p-0158",
        "p-0159",
        "p-0160",
        "p-0161",
        "p-0162",
        "p-0163",
        "p-0164",
        "p-0165",
        "p-0166",
        "p-0167",
        "p-0168",
        "p-0169",
        "p-0170",
        "p-0171",
        "p-0172",
        "p-0173",
        "p-0174",
        "p-0175",
        "p-0176",
        "p-0177",
        "p-0178",
        "p-0179",
        "p-0180",
        "p-0181",
        "p-0182",
        "p-0183"
      ],
      "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
      "start": "2026-11-20",
      "end": "2026-12-20",
      "title": {
        "en": "Sweet Endings — 30% Off Desserts",
        "ar": "نهاية حلوة — خصم 30% على الحلويات"
      },
      "desc": {
        "en": "30% off all desserts with any main course.",
        "ar": "خصم 30% على كل الحلويات مع أي طبق رئيسي."
      }
    },
    {
      "id": "of-pizza60",
      "type": "fixed",
      "discount": 60,
      "active": true,
      "productIds": [
        "p-0282",
        "p-0283",
        "p-0284",
        "p-0285",
        "p-0286",
        "p-0287",
        "p-0288",
        "p-0289",
        "p-0290",
        "p-0291",
        "p-0292",
        "p-0293",
        "p-0294",
        "p-0295",
        "p-0296",
        "p-0297",
        "p-0298",
        "p-0299",
        "p-0300",
        "p-0301",
        "p-0302",
        "p-0303",
        "p-0304",
        "p-0305",
        "p-0306",
        "p-0307",
        "p-0308",
        "p-0309"
      ],
      "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "start": "2026-11-01",
      "end": "2026-11-30",
      "title": {
        "en": "Pizza Night — 60 EGP Off",
        "ar": "ليلة البيتزا — خصم 60 جنيه"
      },
      "desc": {
        "en": "60 EGP off any large pizza, every night after 6 PM.",
        "ar": "خصم 60 جنيه على أي بيتزا كبيرة، كل يوم بعد الساعة 6 مساءً."
      }
    }
  ],
  "settings": {
    "restaurantName": "Latinoo Max",
    "logoUrl": "assets/logo.png",
    "currency": "EGP",
    "whatsapp": "+201040580225",
    "phones": [
      "01040580225",
      "+201040580225"
    ],
    "email": "hello@latinoomax.com",
    "address": {
      "en": "Faqous, Al-Adawi Street, Latinoo Max, Egypt",
      "ar": "فاقوس، شارع العدوي، لاتينو ماكس"
    },
    "workingHours": {
      "en": "Daily: 11:00 AM – 1:00 AM",
      "ar": "يومياً: 11 صباحاً – 1 بعد منتصف الليل"
    },
    "social": {
      "facebook": "https://facebook.com/latinoomax",
      "instagram": "https://instagram.com/latinoomax",
      "tiktok": "https://tiktok.com/@latinoomax"
    },
    "deliveryFees": [
      {
        "area": {
          "en": "Ezbet Om Youssef",
          "ar": "عزبة ام يوسف"
        },
        "fee": 8
      },
      {
        "area": {
          "en": "Kafr El-Balasy",
          "ar": "كفر البلاسي"
        },
        "fee": 8
      },
      {
        "area": {
          "en": "Kafr El-Hout",
          "ar": "كفر الحوت"
        },
        "fee": 8
      },
      {
        "area": {
          "en": "Kafr El-Adawi",
          "ar": "كفر العدوي"
        },
        "fee": 8
      },
      {
        "area": {
          "en": "Kafr Mohamed Ismail",
          "ar": "كفر محمد اسماعيل"
        },
        "fee": 8
      },
      {
        "area": {
          "en": "El-Zawya",
          "ar": "الزاوية"
        },
        "fee": 10
      },
      {
        "area": {
          "en": "Far Kafr El-Adawi",
          "ar": "اخر كفر العدوي"
        },
        "fee": 15
      },
      {
        "area": {
          "en": "Al-Bayroum",
          "ar": "البيروم"
        },
        "fee": 15
      },
      {
        "area": {
          "en": "6th District",
          "ar": "الحي السادس"
        },
        "fee": 15
      },
      {
        "area": {
          "en": "El-Minya",
          "ar": "المنيا"
        },
        "fee": 15
      },
      {
        "area": {
          "en": "Inqiza",
          "ar": "انقيزة"
        },
        "fee": 15
      },
      {
        "area": {
          "en": "Kobri El-Sahara",
          "ar": "كوبري السحاره"
        },
        "fee": 15
      },
      {
        "area": {
          "en": "Kobri El-Sharif",
          "ar": "كوبري الشريف"
        },
        "fee": 15
      },
      {
        "area": {
          "en": "Madrab El-Arz",
          "ar": "مضرب الارز"
        },
        "fee": 15
      },
      {
        "area": {
          "en": "Faqous Town",
          "ar": "فاقوس البلد"
        },
        "fee": 16
      },
      {
        "area": {
          "en": "7th District",
          "ar": "الحي السابع"
        },
        "fee": 20
      },
      {
        "area": {
          "en": "El-Salatna",
          "ar": "السلاطنة"
        },
        "fee": 20
      },
      {
        "area": {
          "en": "Juhayna",
          "ar": "جهينة"
        },
        "fee": 20
      },
      {
        "area": {
          "en": "Meet El-Ezz",
          "ar": "ميت العز"
        },
        "fee": 20
      },
      {
        "area": {
          "en": "El-Sawaky",
          "ar": "السواقي"
        },
        "fee": 25
      },
      {
        "area": {
          "en": "El-Kilania",
          "ar": "الكيلانية"
        },
        "fee": 25
      },
      {
        "area": {
          "en": "Kafr El-Haj Omar",
          "ar": "كفر الحج عمر"
        },
        "fee": 25
      },
      {
        "area": {
          "en": "El-Didamoun",
          "ar": "الديدامون"
        },
        "fee": 30
      }
    ],
    "defaultDeliveryFee": 15,
    "minOrder": 100,
    "taxPercent": 0,
    "codEnabled": true,
    "onlinePaymentEnabled": false,
    "maintenanceMode": false,
    "announcement": {
      "en": "",
      "ar": "",
      "active": false
    },
    "hero": {
      "title": {
        "en": "Delicious Food, Great Mood",
        "ar": "أكل لذيذ، ومزاج رائع"
      },
      "subtitle": {
        "en": "Premium flavours, fresh ingredients and unforgettable moments — delivered to your door in Faqous.",
        "ar": "نكهات فاخرة ومكونات طازجة ولحظات لا تُنسى — نوصلها لباب بيتك في فاقوس."
      },
      "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
      "images": [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "about": {
      "title": {
        "en": "About Latinoo Max",
        "ar": "عن لاتينو ماكس"
      },
      "text": {
        "en": "Latinoo Max was born from a love of bold Latin flavours and the warmth of Egyptian hospitality. On Al-Adawi Street in Faqous, every dish starts with fresh, carefully sourced ingredients — flame-grilled meats, wood-fired pizza dough made daily, and sauces crafted in-house. Whether you dine with us or order in, we promise one thing: delicious food, great mood.",
        "ar": "وُلد لاتينو ماكس من حب النكهات اللاتينية الجريئة ودفء الضيافة المصرية. في شارع العدوي بفاقوس، كل طبق يبدأ بمكونات طازجة مختارة بعناية — لحوم مشوية على اللهب، عجينة بيتزا على الحطب تُصنع يومياً، وصلصات تُحضَّر في مطبخنا. سواء تناولت الطعام معنا أو طلبت للمنزل، نعدك بشيء واحد: أكل لذيذ، ومزاج رائع."
      },
      "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80"
    },
    "adminUser": "admin",
    "adminPass": "admin123"
  },
  "orders": []
};

  /* ------------------------------------------------------------------ */
  /* DB — persistence + CRUD                                            */
  /* ------------------------------------------------------------------ */

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  var db = null;

  function load() {
    if (db) return db;
    try {
      var raw = localStorage.getItem(DB_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.version === SEED.version) { db = parsed; return db; }
      }
    } catch (e) { /* corrupted storage — reseed below */ }
    db = clone(SEED);
    save();
    return db;
  }

  function save() {
    try { localStorage.setItem(DB_KEY, JSON.stringify(db)); }
    catch (e) { console.warn('Latinoo Max: could not save to localStorage', e); }
  }

  function uid(prefix) {
    return prefix + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  var DB = {
    load: load,
    save: save,
    reseed: function () { db = clone(SEED); save(); return db; },

    /* ---- Categories ---- */
    getCategories: function (visibleOnly) {
      var list = load().categories.slice().sort(function (a, b) { return a.order - b.order; });
      return visibleOnly ? list.filter(function (c) { return c.visible; }) : list;
    },
    getCategory: function (id) {
      return load().categories.find(function (c) { return c.id === id; }) || null;
    },
    saveCategory: function (cat) {
      var list = load().categories;
      var i = list.findIndex(function (c) { return c.id === cat.id; });
      if (i >= 0) list[i] = cat; else list.push(cat);
      save(); return cat;
    },
    deleteCategory: function (id) {
      var hasProducts = load().products.some(function (p) { return p.categoryId === id; });
      if (hasProducts) return false;
      load().categories = load().categories.filter(function (c) { return c.id !== id; });
      save(); return true;
    },

    /* ---- Products ---- */
    getProducts: function (filter) {
      filter = filter || {};
      var list = load().products.slice();
      if (filter.categoryId) list = list.filter(function (p) { return p.categoryId === filter.categoryId; });
      if (filter.availableOnly) list = list.filter(function (p) { return p.available; });
      if (filter.featured) list = list.filter(function (p) { return p.featured && p.available; });
      if (filter.query) {
        var q = filter.query.trim().toLowerCase();
        if (q) list = list.filter(function (p) {
          return p.name.en.toLowerCase().includes(q) || p.name.ar.includes(filter.query.trim());
        });
      }
      return list;
    },
    getProduct: function (id) {
      return load().products.find(function (p) { return p.id === id; }) || null;
    },
    saveProduct: function (prod) {
      var list = load().products;
      var i = list.findIndex(function (p) { return p.id === prod.id; });
      if (i >= 0) list[i] = prod; else list.push(prod);
      save(); return prod;
    },
    deleteProduct: function (id) {
      load().products = load().products.filter(function (p) { return p.id !== id; });
      save(); return true;
    },

    /* ---- Offers ---- */
    getOffers: function (activeOnly) {
      var list = load().offers.slice();
      if (!activeOnly) return list;
      var today = todayISO();
      return list.filter(function (o) { return o.active && o.start <= today && o.end >= today; });
    },
    getOffer: function (id) {
      return load().offers.find(function (o) { return o.id === id; }) || null;
    },
    saveOffer: function (offer) {
      var list = load().offers;
      var i = list.findIndex(function (o) { return o.id === offer.id; });
      if (i >= 0) list[i] = offer; else list.push(offer);
      save(); return offer;
    },
    deleteOffer: function (id) {
      load().offers = load().offers.filter(function (o) { return o.id !== id; });
      save(); return true;
    },
    /* Effective price of a product after applying the best active
       percent/fixed offer that covers it. Returns {price, original, offer}.
       Offer model: { type: 'percent'|'fixed'|'bundle', discount (percent or
       EGP), productIds (products covered / in the bundle), bundlePrice,
       originalPrice, start, end (ISO dates), active } */
    priceFor: function (product, sizePrice) {
      var base = (typeof sizePrice === 'number') ? sizePrice : product.price;
      var best = null, bestPrice = base;
      DB.getOffers(true).forEach(function (o) {
        if (o.type === 'bundle') return;
        if (!o.productIds || o.productIds.indexOf(product.id) === -1) return;
        var p = o.type === 'percent'
          ? Math.round(base * (100 - o.discount) / 100)
          : Math.max(0, base - o.discount);
        if (p < bestPrice) { bestPrice = p; best = o; }
      });
      return { price: bestPrice, original: best ? base : null, offer: best };
    },

    /* ---- Settings ---- */
    getSettings: function () { return load().settings; },
    saveSettings: function (patch) {
      Object.assign(load().settings, patch);
      save(); return load().settings;
    },

    /* ---- Orders ---- */
    getOrders: function () {
      return load().orders.slice().sort(function (a, b) { return b.createdAt - a.createdAt; });
    },
    getOrder: function (id) {
      return load().orders.find(function (o) { return o.id === id; }) || null;
    },
    createOrder: function (order) {
      order.id = uid('ord');
      order.number = 'LM-' + String(load().orders.length + 1).padStart(5, '0');
      order.createdAt = Date.now();
      order.status = 'Pending';
      load().orders.unshift(order);
      save(); return order;
    },
    updateOrderStatus: function (id, status) {
      var o = DB.getOrder(id);
      if (!o) return false;
      o.status = status;
      save(); return true;
    },

    /* ---- Cart (separate key, same DB family) ---- */
    getCart: function () {
      try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
      catch (e) { return []; }
    },
    saveCart: function (cart) {
      try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
    },
    clearCart: function () { try { localStorage.removeItem(CART_KEY); } catch (e) {} },

    /* ---- Language ---- */
    getLang: function () {
      try { return localStorage.getItem(LANG_KEY) || 'en'; } catch (e) { return 'en'; }
    },
    setLang: function (lang) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    },

    uid: uid,
    todayISO: todayISO
  };

  DB.seed = DB.reseed; /* alias used by the admin "Reset Data" action */

  global.DB = DB;
  global.LATINOO_SEED = SEED;
})(typeof window !== 'undefined' ? window : globalThis);
