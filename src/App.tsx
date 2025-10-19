import EternityRadioPlayer from './components/RadioPlayer'
import { useRef, useState } from "react";

let stations = {
    "Title": "Guide - Eternity Ready Radio & Music",
    "Number of channels": 399,
    "channels": [
        {
            "name": "Eternity Ready Radio",
            "description": "Alternative Christian radio station focusing on Generation Z and music from the 1990s and 2000s.",
            "src": "https://mp3.eternityready.com/stream",
            "logo": "https://www.eternityreadyradio.com/api/public/stations/thumbnail/eternityRadio.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 5,
            "categories": [
                "Eternity Ready Radio",
                "Family Friendly"
            ]
        },
        {
            "name": "RRR",
            "description": "Radio station belonging to the Eternity Ready group, with contemporary Christian programming.",
            "src": "https://azura.eternityready.com/listen/rapture_ready_radio/radio.mp3",
            "logo": "https://www.eternityreadyradio.com/api/public/stations/thumbnail/RRR_thumbnail.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 4,
            "categories": [
                "Rapture ready radio",
                "Bible prophecy"
            ]
        },
        {
            "name": "Keys for Kids Radio",
            "description": "Children's radio station with educational Christian songs and stories.",
            "src": "https://das-edge14-live365-dal02.cdnstream.com/a78246_2",
            "logo": "https://www.eternityreadyradio.com/api/public/stations/thumbnail/KeysforKidsRadio_thumbnail.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 4,
            "categories": [
                "Family & Kids"
            ]
        },
        {
            "name": "Christian Mix 106",
            "description": "24/7 Christian Music and Programming geared to bring people to Jesus!",
            "src": "https://das-edge15-live365-dal02.cdnstream.com/a94308",
            "logo": "https://www.eternityreadyradio.com/api/public/stations/thumbnail/ChristianMix106_thumbnail.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 4,
            "categories": [
                "Christian Radio"
            ]
        },
        {
            "name": "88.3 FM The Journey",
            "description": "FM station focusing on uplifting Christian music.",
            "src": "https://ice42.securenetsystems.net/KJRN?playSessionID=B3FC37CC-0E07-DBB4-26521C9BFA0A4AF7",
            "logo": "https://www.eternityreadyradio.com/api/public/stations/thumbnail/88.3FMTheJourney_thumbnail.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 3,
            "categories": [
                "Christian Radio"
            ]
        },
        {
            "name": "Crossroads Radio",
            "description": "Station mixing modern praise & worship with all types of music.",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a27545",
            "logo": "https://www.eternityreadyradio.com/api/public/stations/thumbnail/CrossroadsRadio_thumbnail.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 4,
            "categories": [
                "Christian Radio"
            ]
        },
        {
            "name": "VertiZontal Radio",
            "description": "Combination of vertical worship and horizontal messages for life.",
            "src": "https://das-edge16-live365-dal02.cdnstream.com/a34398",
            "logo": "https://www.eternityreadyradio.com/api/public/stations/thumbnail/VertiZontalRadio_thumbnail.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 3,
            "categories": [
                "Christian Mix"
            ]
        },
        {
            "name": "The Worship Channel",
            "description": "Christian worship songs 24 hours a day.",
            "src": "https://das-edge17-live365-dal02.cdnstream.com/a45950",
            "logo": "https://www.eternityreadyradio.com/api/public/stations/thumbnail/theWorshipChannel.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 3,
            "categories": [
                "Worship Radio"
            ]
        },
        {
            "name": "KJOL",
            "description": "Christian broadcast focusing on biblical encouragement.",
            "src": "https://14993.live.streamtheworld.com/KJOLFMAAC.aac",
            "logo": "https://www.eternityreadyradio.com/api/public/stations/thumbnail/KJOL_thumbnail.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 3,
            "categories": [
                "Christian Radio"
            ]
        },
        {
            "name": "Affirm Southern Gospel Radio",
            "description": "Traditional and contemporary Southern gospel.",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a38333",
            "logo": "https://www.eternityreadyradio.com/api/public/stations/thumbnail/AffirmSouthernGospelRadio_thumbnail.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 4,
            "categories": [
                "Southern Gospel"
            ]
        },
        {
            "name": "Serene Radio",
            "description": "Soft, relaxing music with Christian messages.",
            "src": "https://s6.reliastream.com/proxy/serene?mp=/stream&1728581430735",
            "logo": "https://www.eternityreadyradio.com/api/public/stations/thumbnail/SereneRadio_thumbnail.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 3,
            "categories": [
                "Relaxing Music"
            ]
        },
        {
            "name": "Heaven's Country",
            "description": "Christian country music 24 hours a day.",
            "src": "https://das-edge11-live365-dal03.cdnstream.com/a66385",
            "logo": "https://www.eternityreadyradio.com/api/public/stations/thumbnail/Heaven'sCountry_thumbnail.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 4,
            "categories": [
                "Christian Country"
            ]
        },
        {
            "name": "WBLB Family 1340",
            "description": "Family Christian station with varied gospel programming.",
            "src": "https://das-edge17-live365-dal02.cdnstream.com/a88004",
            "logo": "https://www.eternityreadyradio.com/api/public/stations/thumbnail/WBLBFamily1340_thumbnail.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 3,
            "categories": [
                "Family Radio"
            ]
        },
        {
            "name": "WOTG Radio",
            "description": "Southern Gospel Music from WOTG Radio Network.",
            "src": "https://das-edge13-live365-dal02.cdnstream.com/a28533",
            "logo": "img/wotg.webp",
            "tags": [
                "",
                "featured"
            ],
            "rating": 4,
            "categories": [
                "Southern Gospel"
            ]
        },
        {
            "name": "Branson Gospel Radio",
            "description": "Southern Gospel Music from Branson, Missouri.",
            "src": "https://das-edge09-live365-dal03.cdnstream.com/a86732",
            "logo": "img/bransongospelradio.webp",
            "tags": [
                "",
                "featured"
            ],
            "rating": 3,
            "categories": [
                "Southern Gospel"
            ]
        },
        {
            "name": "Ohio Valley Gospel Radio",
            "description": "Southern Gospel Music from WOTG Radio Network.",
            "src": "https://das-edge14-live365-dal02.cdnstream.com/a30752",
            "logo": "img/ohiovalleygospelradio.webp",
            "tags": [
                "",
                "featured"
            ],
            "rating": 4,
            "categories": [
                "Southern Gospel"
            ]
        },
        {
            "name": "KOTG Radio",
            "description": "Southern Gospel Music from WOTG Radio Network.",
            "src": "https://das-edge17-live365-dal02.cdnstream.com/a26086",
            "logo": "img/kotgradio.webp",
            "tags": [
                "",
                "featured"
            ],
            "rating": 3,
            "categories": [
                "Southern Gospel"
            ]
        },
        {
            "name": "WYLIE Gospel Radio",
            "description": "Southern Gospel Music from Wylie, Texas.",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a02303",
            "logo": "img/wylieradio.webp",
            "tags": [
                "",
                "featured"
            ],
            "rating": 4,
            "categories": [
                "Southern Gospel"
            ]
        },
        {
            "name": "KBAF Christian Radio",
            "description": "Southern Gospel Music from WOTG Radio Network.",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a02303",
            "logo": "img/kbaf.webp",
            "tags": [
                "",
                "featured"
            ],
            "rating": 3,
            "categories": [
                "Southern Gospel"
            ]
        },
        {
            "name": "WORB Radio",
            "description": "Southern Gospel Music from WOTG Radio Network.",
            "src": "https://das-edge16-live365-dal02.cdnstream.com/a12207",
            "logo": "img/worb.webp",
            "tags": [
                "",
                "featured"
            ],
            "rating": 4,
            "categories": [
                "Southern Gospel"
            ]
        },
        {
            "name": "See the Vision, 2918 Radio",
            "description": "Southern Gospel Music from WOTG Radio Network.",
            "src": "https://das-edge17-live365-dal02.cdnstream.com/a06564",
            "logo": "img/seethevision.webp",
            "tags": [
                "",
                "featured"
            ],
            "rating": 3,
            "categories": [
                "Southern Gospel"
            ]
        },
        {
            "name": "RacMan Christian Radio",
            "description": "Eclectic Blends of CCM, EDM, Rock, Americana, Worship, Country & Southern Gospel.",
            "src": "https://das-edge15-live365-dal02.cdnstream.com/a79699",
            "logo": "img/racmanchristianradio.png",
            "tags": [
                "sister",
                "featured"
            ],
            "rating": 4,
            "categories": [
                "Christian Mix"
            ]
        },
        {
            "name": "Country Gold",
            "description": "Southern Gospel Music from WOTG Radio Network.",
            "src": "https://das-edge14-live365-dal02.cdnstream.com/a15048",
            "logo": "img/countrygold.webp",
            "tags": [
                "",
                "featured"
            ],
            "rating": 3,
            "categories": [
                "Southern Gospel"
            ]
        },
        {
            "name": "Iglesia Emmanuel",
            "description": "",
            "src": "https://das-edge11-live365-dal03.cdnstream.com/a09818",
            "logo": " https://www.eternityready.com/radio/img/Iglesia Emmanuel.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Praise/Worship",
                "Talk"
            ]
        },
        {
            "name": "WCB \"America's Gospel FM\"",
            "description": "Southern gospel new, old and deep album tracks. Write us at wcbradio@aol.com  ",
            "src": "https://das-edge17-live365-dal02.cdnstream.com/a24208",
            "logo": " https://www.eternityready.com/radio/img/WCB -America's Gospel FM-.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Sermons/Services",
                "Southern Gospel",
                "Traditional Gospel",
                "Religious"
            ]
        },
        {
            "name": "The Bridge Austin",
            "description": "Today's Christians Teaching and Talk",
            "src": "https://das-edge11-live365-dal03.cdnstream.com/a20823",
            "logo": " https://www.eternityready.com/radio/img/The Bridge Austin.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Talk"
            ]
        },
        {
            "name": "WFPR-DB",
            "description": "Faith based radio",
            "src": "https://streaming.live365.com/a46781",
            "logo": " https://www.eternityready.com/radio/img/WFPR-DB.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Praise/Worship"
            ]
        },
        {
            "name": "suzysradio",
            "description": "Albums...so much unheard music...and some fun too",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a24307",
            "logo": " https://www.eternityready.com/radio/img/suzysradio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Blues",
                "Folk Rock",
                "Christian",
                "Classic Rock",
                "Comedy"
            ]
        },
        {
            "name": "PsalmFM",
            "description": "Non-Commercial and listener-supported, Psalm FM covers a large part of Northern Minnesota and Northwestern Ontario, Canada from a transmitter site near International Falls, Minn. (KBHW 99.5 FM). \n\nPsalm FM in Hibbing, Minn., (KADU 90.1 FM), covers the Iron Range from its transmitter site near Hibbing. With a multi-generational appeal, Psalm FM\u2019s primary focus is to connect with listeners who want to hear a blend of praise and worship music, Bible teaching, and conversation.",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a21161",
            "logo": " https://www.eternityready.com/radio/img/PsalmFM.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Inspirational",
                "Christian Contemporary",
                "Christian",
                "Praise/Worship"
            ]
        },
        {
            "name": "That's The Truth!",
            "description": "Preaching God's Word with power and anointing. \r\nSalvation For This Generation!",
            "src": "https://das-edge17-live365-dal02.cdnstream.com/a70520",
            "logo": " https://www.eternityready.com/radio/img/That's The Truth!.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Gospel",
                "Sermons/Services",
                "Spoken Word",
                "Religious"
            ]
        },
        {
            "name": "Radio Poder DC/MD/Northern VA (WWGB)",
            "description": "WWGB Washington, D.C./Northern Virginia/Southern Maryland",
            "src": "https://das-edge13-live365-dal02.cdnstream.com/a78751",
            "logo": " https://www.eternityready.com/radio/img/Radio Poder DC-MD-Northern VA (WWGB).png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Latin"
            ]
        },
        {
            "name": "Not All Is Lost Radio",
            "description": " Not All Is Lost Radio shares the good news of the Gospel and Teachings of Our Lord Jesus Christ through contemporary Christian Music, inspirational Biblical passages, and perspectives on Christian living.",
            "src": "https://das-edge14-live365-dal02.cdnstream.com/a16204",
            "logo": " https://www.eternityready.com/radio/img/Not All Is Lost Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Inspirational",
                "Christian Contemporary",
                "Christian",
                "Christian Rock",
                "Spiritual"
            ]
        },
        {
            "name": "SGM Radio (Southern Gospel Music)",
            "description": "SGM Radio The Best In Today's Gospel Music Powered By SGN Scoops Magazine",
            "src": "https://das-edge13-live365-dal02.cdnstream.com/a25427",
            "logo": " https://www.eternityready.com/radio/img/SGM Radio (Southern Gospel Music).png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Southern Gospel",
                "Religious"
            ]
        },
        {
            "name": "KC Gold Radio",
            "description": "KC Gold Radio is a mixed radio that play gospel, R&B, and jazz",
            "src": "https://das-edge15-live365-dal02.cdnstream.com/a37621",
            "logo": " https://www.eternityready.com/radio/img/KC Gold Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Smooth Jazz",
                "Urban and R&B"
            ]
        },
        {
            "name": "ONDAS DE VIDA Network",
            "description": "LA FRECUENCIA DEL CAMBIO",
            "src": "https://das-edge13-live365-dal02.cdnstream.com/a40407",
            "logo": " https://www.eternityready.com/radio/img/ONDAS DE VIDA Network.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian"
            ]
        },
        {
            "name": "WCSR|db",
            "description": "Classic & Contemporary Christian music from the 70's, 80's, 90's and beyond",
            "src": "https://das-edge13-live365-dal02.cdnstream.com/a34934",
            "logo": " https://www.eternityready.com/radio/img/WCSR-db.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Christian Rock",
                "Classic Christian",
                "Contemporary Gospel"
            ]
        },
        {
            "name": "AF Radio",
            "description": "Now you can enjoy listening to the everlasting gospel 24/7 through our Internet radio station with Pastor Doug Batchelor and other featured speakers.",
            "src": "https://das-edge15-live365-dal02.cdnstream.com/a87965",
            "logo": " https://www.eternityready.com/radio/img/AF Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Inspirational",
                "Christian",
                "Classic Christian",
                "Sermons/Services",
                "Religious"
            ]
        },
        {
            "name": "The Cross Point Connection",
            "description": "The Best In Southern Gospel Music",
            "src": "https://das-edge15-live365-dal02.cdnstream.com/a73150",
            "logo": " https://www.eternityready.com/radio/img/The Cross Point Connection.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Sermons/Services",
                "Southern Gospel",
                "Religious"
            ]
        },
        {
            "name": "WJTG Radio Randall & Birdella ",
            "description": "Christian Music and Talk",
            "src": "https://das-edge15-live365-dal02.cdnstream.com/a38478",
            "logo": " https://www.eternityready.com/radio/img/WJTG Radio Randall & Birdella .png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Talk"
            ]
        },
        {
            "name": "KPJOF Radio",
            "description": "Spinning music for you and your family!  Providing you with the motivation necessary to  Keep Pushing along your Journey of Faith! (KPJOF) *** Business Inquiries: kpjofradio@gmail.com *** ***  Music Submission: kpjofmusic@gmail.com *** Request / Shoutout line Text:  762-233-7009 ***",
            "src": "https://das-edge14-live365-dal02.cdnstream.com/a87278",
            "logo": " https://www.eternityready.com/radio/img/KPJOF Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Turntablism",
                "Christian",
                "Christian Rap",
                "Gospel",
                "Hip Hop"
            ]
        },
        {
            "name": "Heavenspace Radio",
            "description": "We are an online Christian Internet Radio Station committed to bringing the Christian message to as many listeners as possible, by broadcasting Contemporary Christian Music, Worship, Scripture and Testimonies.",
            "src": "https://das-edge13-live365-dal02.cdnstream.com/a28309",
            "logo": " https://www.eternityready.com/radio/img/Heavenspace Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Inspirational",
                "Christian Contemporary",
                "Christian",
                "Christian Rock",
                "Contemporary Gospel"
            ]
        },
        {
            "name": "The Christian Mix",
            "description": "This station plays The Classics of Yesterday ... The Hits of Today!  We play everything from Amy Grant to Kirk Franklin, Newsboys to Petra, Jeremy Camp to WhiteHeart, Phil Wickham to Phil Driscoll, 2nd Chapter of Acts to TobyMac.  The perfect mix you have been looking for! ",
            "src": "https://das-edge13-live365-dal02.cdnstream.com/a49275",
            "logo": " https://www.eternityready.com/radio/img/The Christian Mix.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Classic Christian",
                "Gospel"
            ]
        },
        {
            "name": "The Vibe",
            "description": "Contact the VIBE today for request and comments at toddmediallc@gmail.com",
            "src": "https://das-edge16-live365-dal02.cdnstream.com/a43550",
            "logo": " https://www.eternityready.com/radio/img/The Vibe.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "80s",
                "90s",
                "Christian"
            ]
        },
        {
            "name": "HUB Radio Network",
            "description": "Community radio station playing Christian music and live radio programs.",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a89403",
            "logo": " https://www.eternityready.com/radio/img/HUB Radio Network.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian"
            ]
        },
        {
            "name": "GoMix Early Light WGML",
            "description": "",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a83431",
            "logo": " https://www.eternityready.com/radio/img/GoMix Early Light WGML.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Classic Christian"
            ]
        },
        {
            "name": "All Jesus All The Time Radio  Ministries",
            "description": "",
            "src": "https://das-edge17-live365-dal02.cdnstream.com/a60387",
            "logo": " https://www.eternityready.com/radio/img/All Jesus All The Time Radio  Ministries.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Classic Christian",
                "Praise/Worship",
                "Traditional Gospel"
            ]
        },
        {
            "name": "WORSHIP PRIME RADIO",
            "description": "Christian Internet Radio Station.\n\n\u201dEnter into His gates with thanksgiving, And into His courts with praise. Be thankful to Him, and bless His name.\u201c\nPsalms 100:4",
            "src": "https://das-edge11-live365-dal03.cdnstream.com/a90214",
            "logo": " https://www.eternityready.com/radio/img/WORSHIP PRIME RADIO.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Classic Christian",
                "Gospel",
                "Praise/Worship"
            ]
        },
        {
            "name": "Warfare Fm",
            "description": "We are in Christ centered, Internet radio station in Lakeland Florida!  We play all genres of Christian music.",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a14473",
            "logo": " https://www.eternityready.com/radio/img/Warfare Fm.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Christian Rock",
                "Classic Christian",
                "Gospel",
                "Religious"
            ]
        },
        {
            "name": "Yahweh Radio",
            "description": "Praise and Worship to the Lord GOD Almighty with an emphasis on ensuring that HE is the OBJECT of our affection,  The Word of GOD will be featured prominently on this station also.",
            "src": "https://das-edge16-live365-dal02.cdnstream.com/a21164",
            "logo": " https://www.eternityready.com/radio/img/Yahweh Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Contemporary Gospel",
                "Praise/Worship",
                "Traditional Gospel"
            ]
        },
        {
            "name": "Continue & Don't Stop Jamz ",
            "description": "Welcome To Continue & Don't Stop Jamz Where We Never Give Up Because God Doesn't Either",
            "src": "https://das-edge16-live365-dal02.cdnstream.com/a08613",
            "logo": " https://www.eternityready.com/radio/img/Continue & Don't Stop Jamz .png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Christian Rap"
            ]
        },
        {
            "name": "Inspiration Radio",
            "description": "Playing the BEST Contemporary Christian Music from the past 25 years!",
            "src": "https://das-edge16-live365-dal02.cdnstream.com/a85263",
            "logo": " https://www.eternityready.com/radio/img/Inspiration Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Religious"
            ]
        },
        {
            "name": "LTN Radio",
            "description": "A commerical-free Christian alternative station from Love Thy Nerd, playing the best in Christian rock, rap, pop, and indie!",
            "src": "https://das-edge11-live365-dal03.cdnstream.com/a65452",
            "logo": " https://www.eternityready.com/radio/img/LTN Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Indie Rock",
                "Christian Contemporary",
                "Christian",
                "Christian Rap",
                "Christian Rock"
            ]
        },
        {
            "name": "TRAPFORMATION Radio",
            "description": "TRAPFORMATION es una emisora de radio y plataforma en l\u00ednea centrada en la m\u00fasica y la cultura urbana, espec\u00edficamente en el g\u00e9nero musical del trap, as\u00ed como otros subg\u00e9neros relacionados como el reggaet\u00f3n, el hip-hop y la m\u00fasica urbana en general con letras 100% limpias. ",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a68723",
            "logo": " https://www.eternityready.com/radio/img/TRAPFORMATION Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Christian Rap",
                "Urban and R&B"
            ]
        },
        {
            "name": "Eagle Wings Radio",
            "description": "Eagle Wings Radio is a Christian Country station. We play music by artists like The Booth Brothers, Alan Jackson, Lynda Randle, along with various independent artists. We host a number of pre-recorded programs like The Jesscot Music Hour, Country Gospel With Ed Brady. Within each program list we insert devotional talks by Max Lucado, Greg Laurie, and Ron Hutchcraft.",
            "src": "https://das-edge16-live365-dal02.cdnstream.com/a44835",
            "logo": " https://www.eternityready.com/radio/img/Eagle Wings Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Inspirational",
                "Christian",
                "Praise/Worship"
            ]
        },
        {
            "name": "Live Streaming From Heaven",
            "description": "We are streaming sounds from heaven through music and the declaration of God's Word.",
            "src": "https://das-edge09-live365-dal03.cdnstream.com/a10330",
            "logo": " https://www.eternityready.com/radio/img/Live Streaming From Heaven.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Praise/Worship",
                "Sermons/Services",
                "Religious"
            ]
        },
        {
            "name": "Power 93.3 WXLN ",
            "description": "Welcome to POWER 93.3 FM \u2013 Your Hometown Radio Station in Shelbyville Kentucky. Providing you with your local news, local Weather, High School Sports (TITANS and ROCKETS Football & Basketball), Business Remote Broadcast\u2019s  and so much more!!! Listen online at wxlnradio.com",
            "src": "https://das-edge13-live365-dal02.cdnstream.com/a39022",
            "logo": " https://www.eternityready.com/radio/img/Power 93.3 WXLN .png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christmas Standards",
                "Christian Contemporary",
                "Christian",
                "Christian Rock"
            ]
        },
        {
            "name": "DFinite Radio",
            "description": "The Sound of Ages",
            "src": "https://das-edge13-live365-dal02.cdnstream.com/a71325",
            "logo": " https://www.eternityready.com/radio/img/DFinite Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Country",
                "Easy Listening",
                "Christian",
                "Zouk",
                "Reggae"
            ]
        },
        {
            "name": "Purpose Praise Radio",
            "description": "Playing Any and Everything Gospel",
            "src": "https://das-edge15-live365-dal02.cdnstream.com/a82609",
            "logo": " https://www.eternityready.com/radio/img/Purpose Praise Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Gospel",
                "Praise/Worship",
                "Traditional Gospel"
            ]
        },
        {
            "name": "YHWH-Radio.com",
            "description": "We are a Christian app who plays the latest in Christian music, sermons, podcasts and more.",
            "src": "https://das-edge15-live365-dal02.cdnstream.com/a37797",
            "logo": " https://www.eternityready.com/radio/img/YHWH-Radio.com.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian"
            ]
        },
        {
            "name": "Blessing.fm",
            "description": "Espa\u00f1ol\nBlessing.fm, ubicada en Bayam\u00f3n, Puerto Rico, es una emisora cristiana que, por medio de radio, televisi\u00f3n y redes sociales, lleva un mensaje de transici\u00f3n, avance, \u00e9xito y conquista, mostrando el deseo del coraz\u00f3n de Dios y Su intenci\u00f3n con sus hijos, en una generaci\u00f3n que se levanta con poder sobrenatural.\n\nIngl\u00e9s\nBlessing.fm, based in Bayam\u00f3n, Puerto Rico, is a Christian station that, through radio, television, and social media, shares a message of transition, progress, success, and conquest, revealing the desire of God\u2019s heart and His intention for His children, in a generation rising with supernatural power.",
            "src": "https://das-edge14-live365-dal02.cdnstream.com/a69646",
            "logo": " https://www.eternityready.com/radio/img/Blessing.fm.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Praise/Worship",
                "Latin",
                "Talk"
            ]
        },
        {
            "name": "Hands Up Radio",
            "description": "WHUR is a 247 Internet Radio Station. We are a Christian based station and we play Gospel and Christian Music featuring Stellar Award Winners and more. We carry ASCAP, BMI, SESAC and other licensing to operate as a legal radio station. We reach over 120 countries World Wide including US. UK and Canada and we are powered by Live 365. \n\nFor Music Submissions Contact:\nbruce@handsupradio@gmail.com\n\nFor additional information contact our office at: tperryhandsupradio@gmail.com",
            "src": "https://das-edge14-live365-dal02.cdnstream.com/a24176",
            "logo": " https://www.eternityready.com/radio/img/Hands Up Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Gospel",
                "Urban Contemporary"
            ]
        },
        {
            "name": "Caribbean SONshine Radio",
            "description": "What do you get when you combine the unique sounds of the Caribbean with the gospel message? You get Caribbean SONshine Radio. If you're looking for today's hits and favorites from the past, then you've come to the right place. Here you will find not only reggae and soca, but a plethora of Caribbean genres including dancehall, steelpan, salsa, zouk, and more.   The mission of Caribbean SONshine Radio is to \u201cGo into all the world and proclaim the gospel\" (Mark 16:15) through music. And be sure to visit my blog, \"Walking with Yeshua\" at http://CrossWalk888.com ",
            "src": "https://das-edge14-live365-dal02.cdnstream.com/a26018",
            "logo": " https://www.eternityready.com/radio/img/Caribbean SONshine Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Gospel",
                "Caribbean",
                "Soca",
                "Reggae"
            ]
        },
        {
            "name": "The Hub",
            "description": "Indy's home for the best Christian music and positive encouragement. A unique sound representing all of His United Body. Want to request a song? Visit thehubchurch620.com.",
            "src": "https://das-edge13-live365-dal02.cdnstream.com/a34144",
            "logo": " https://www.eternityready.com/radio/img/The Hub.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Inspirational",
                "Christian Contemporary",
                "Christian",
                "Christian Rap",
                "Contemporary Gospel"
            ]
        },
        {
            "name": "90.9 WCFG (aa)",
            "description": "Family-Friendly, Commercial-Free Christian Music (Battle Creek, MI)",
            "src": "https://das-edge13-live365-dal02.cdnstream.com/a77454",
            "logo": " https://www.eternityready.com/radio/img/90.9 WCFG (aa).png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Spiritual",
                "Religious"
            ]
        },
        {
            "name": "Global Southen Gospel Radio",
            "description": "Playing the best of of today's and yesterdays Southern Gospel. Contemporary and Country Gospel.   Playing Heavenly music here on earth 24/7. ",
            "src": "https://das-edge13-live365-dal02.cdnstream.com/a02638",
            "logo": " https://www.eternityready.com/radio/img/Global Southen Gospel Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Gospel",
                "Healing",
                "Spiritual"
            ]
        },
        {
            "name": "Trauma to Triumph Radio",
            "description": "",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a82856",
            "logo": " https://www.eternityready.com/radio/img/Trauma to Triumph Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Contemporary Gospel",
                "Gospel",
                "Praise/Worship",
                "Sermons/Services"
            ]
        },
        {
            "name": "CCM in 3D",
            "description": "Contemporary Christian Music from the 80s 90s and whenever!\nPresented by The 3Ds: Dan, Derek, and Dave.\n\nAmy Grant, Michael W. Smith, Petra, DC Talk, Steven Curtis Chapman, White Heart, DeGarmo & Key, Newsboys, 4Him, PFR, Mylon & Broken Heart, Margaret Becker, Russ Taff, Imperials, David Meece, and MORE\n\n-- but NO jazz flute!",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a15104",
            "logo": " https://www.eternityready.com/radio/img/CCM in 3D.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "80s",
                "90s",
                "Christian Contemporary",
                "Christian",
                "Classic Christian"
            ]
        },
        {
            "name": "PRAIZY\u2122 Radio",
            "description": "Welcome to PRAIZY\u2122 Radio \u2014 The Official Soundtrack of a Faith-Fueled Generation\n\nThis ain\u2019t your grandma\u2019s faith-based music station. PRAIZY\u2122 Radio is the home of Christian Pop Music, streaming 24/7 with nothing but bops, bangers, and original podcasts just for you. From Christian Pop to Pop Rock, Hip-Hop to Dance, R&B to Rhythmic Worship\u2014we\u2019re curating the new wave of faith-driven music that slaps. No fluff. No filler. Just fire, with Jesus at the center.\nWe\u2019re the first and only station repping the Christian Pop format for Gen Z and younger millennials\u2014a whole new lane for a new kind of believer and seeker. This is music that serves on an identity level. Think: Jesus meets TRL vibes, meets Hot 100 energy\u2014with purpose.\n\nWhether you\u2019re vibin\u2019 in the car, grinding at the gym, on your knees in worship, praising out with friends, in your prayer closet, or just need a little faith-fueled mood lift between classes\u2014this is the space that gets you and meets you right where you are: socially engaged and in the center of everything.\n\nPowered by PRAIZY\u2122 Radio, the revolutionary Christian music + entertainment OTT startup, we\u2019re not just playing music\u2014we\u2019re flipping the whole script. Your faith walk isn\u2019t boring. It\u2019s not chained to Sundays or giving the elder vibes streaming on KLOVE, Air1, or JoyFM\u2014and your soundtrack shouldn\u2019t be either.\nWe aspire to lift you higher. So press play and go PRAIZY\u2122.\n",
            "src": "https://das-edge16-live365-dal02.cdnstream.com/a00413",
            "logo": " https://www.eternityready.com/radio/img/PRAIZY\u2122 Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian"
            ]
        },
        {
            "name": "Rocking for Jesus",
            "description": "Your Favorite Christian and Alternative Rock Station",
            "src": "https://das-edge11-live365-dal03.cdnstream.com/a07944",
            "logo": " https://www.eternityready.com/radio/img/Rocking for Jesus.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Christian Rock",
                "Rock",
                "Alternative Rock"
            ]
        },
        {
            "name": "God Help Me Today",
            "description": "Where God's Word transforms hearts and changes lives",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a39033",
            "logo": " https://www.eternityready.com/radio/img/God Help Me Today.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Talk"
            ]
        },
        {
            "name": "UED (Unbound Eternal Destination) Radio",
            "description": "UED (Unbound Eternal Destination) Radio is a spiritual music radio station that has great music for listeners.",
            "src": "https://das-edge16-live365-dal02.cdnstream.com/a05666",
            "logo": " https://www.eternityready.com/radio/img/UED (Unbound Eternal Destination) Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian"
            ]
        },
        {
            "name": "WDSG-LP FM",
            "description": "SANFORD NC. GOSPEL AND BEACH MUSIC",
            "src": "https://das-edge17-live365-dal02.cdnstream.com/a66392",
            "logo": " https://www.eternityready.com/radio/img/WDSG-LP FM.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Gospel",
                "Praise/Worship"
            ]
        },
        {
            "name": "Promise 89.7 FM KARM",
            "description": "",
            "src": "https://das-edge11-live365-dal03.cdnstream.com/a26590",
            "logo": " https://www.eternityready.com/radio/img/Promise 89.7 FM KARM.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian"
            ]
        },
        {
            "name": "Global Gospel Worship Radio",
            "description": "This radio station has Christian international and contemporary music, as well as Christian radio programs with no ads. This international radio station began on January 30th, 2021 and focuses on including Christian music played by different nations in the world. Currently, we have music from Latin America, Israel, Middle East, Asian, and songs by Native American singers, as well as children's Worship music. \n\nMy radio program, Faith City Outreach, is on air M-Sun at 10am & 5pm, MST zone and it is also on air on two other radio stations.   \n\nMarina Maria\nHost/Founder\nFcoprogram@gmail.com",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a07494",
            "logo": " https://www.eternityready.com/radio/img/Global Gospel Worship Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Christian Rock",
                "Classic Christian",
                "Gospel"
            ]
        },
        {
            "name": "Total Worship Radio ",
            "description": "Creating an atmosphere of Heaven on Earth.",
            "src": "https://das-edge11-live365-dal03.cdnstream.com/a06578",
            "logo": " https://www.eternityready.com/radio/img/Total Worship Radio .png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian"
            ]
        },
        {
            "name": "New Journey Radio",
            "description": "The New Sound of Southern Gospel",
            "src": "https://das-edge17-live365-dal02.cdnstream.com/a03775",
            "logo": " https://www.eternityready.com/radio/img/New Journey Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Classic Christian",
                "Gospel",
                "Sermons/Services",
                "Southern Gospel"
            ]
        },
        {
            "name": "Worship Word & Prayer Ministries Radio ",
            "description": "Christian Gospel Station Streaming Music, Sermons, Worship Services, and Christian Talk Broadcast",
            "src": "https://das-edge11-live365-dal03.cdnstream.com/a87482",
            "logo": " https://www.eternityready.com/radio/img/Worship Word & Prayer Ministries Radio .png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Gospel",
                "Praise/Worship",
                "Sermons/Services",
                "Spoken Word"
            ]
        },
        {
            "name": "Kingdom Grind Radio",
            "description": "Kingdom Grind Radio is your new gospel station",
            "src": "https://das-edge09-live365-dal03.cdnstream.com/a59950",
            "logo": " https://www.eternityready.com/radio/img/Kingdom Grind Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Gospel",
                "Traditional Gospel"
            ]
        },
        {
            "name": "Wonderful Grace Radio",
            "description": "",
            "src": "https://das-edge11-live365-dal03.cdnstream.com/a21054",
            "logo": " https://www.eternityready.com/radio/img/Wonderful Grace Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Classic Christian",
                "Traditional Gospel"
            ]
        },
        {
            "name": "Enlite Radio",
            "description": "We are a multicultural Gospel Radio Station. Where you hear the best Gospel music every hour, of every day for your listening pleasure - You're sure to hear your kind of Gospel music.",
            "src": "https://das-edge11-live365-dal03.cdnstream.com/a82585",
            "logo": " https://www.eternityready.com/radio/img/Enlite Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Gospel",
                "African",
                "Spiritual",
                "Reggae"
            ]
        },
        {
            "name": "V.I.P RADIO",
            "description": "Declaring Victory, through the Word of God, Prayer, and Songs of Praise that keep you uplifted.  Your station for inspiration playing nothing but the best in gospel music.",
            "src": "https://das-edge09-live365-dal03.cdnstream.com/a47529",
            "logo": " https://www.eternityready.com/radio/img/V.I.P RADIO.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Gospel",
                "Praise/Worship",
                "Sermons/Services"
            ]
        },
        {
            "name": "GTS Smart Speakers",
            "description": "",
            "src": "https://das-edge15-live365-dal02.cdnstream.com/a42076",
            "logo": " https://www.eternityready.com/radio/img/GTS Smart Speakers.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian"
            ]
        },
        {
            "name": "Holy Ruckus Radio",
            "description": "Holy Ruckus Radio, Church music that will have you putting on your Chuck Taylors or Adidas. Holy Hip Hop, Soul, R&B, Funk, Gospel and Oldies from the pioneers of each Genre and today\u2019s artists. The Sunday morning message with a Saturday night sound. I\u2019m your host DJ Aztec, you can connect with me at holyruckusradio@gmail.com and I thank you for letting me put the Holy Funk in your ear hole.",
            "src": "https://das-edge11-live365-dal03.cdnstream.com/a81576",
            "logo": " https://www.eternityready.com/radio/img/Holy Ruckus Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Hip-Hop/Rap",
                "Christian",
                "Gospel",
                "Funk",
                "Oldies"
            ]
        },
        {
            "name": "AGCWGTS",
            "description": "",
            "src": "https://das-edge09-live365-dal03.cdnstream.com/a86254",
            "logo": " https://www.eternityready.com/radio/img/AGCWGTS.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian"
            ]
        },
        {
            "name": "LouangeFM",
            "description": "LouangeFM is a Christian internet radio station broadcasting from Martinique, offering a refreshing stream of contemporary worship, gospel hits, and inspiring messages. We\u2019re here 24/7 to uplift your spirit, encourage your faith, and fill your day with hope and praise. Wherever you are in the world, tune in and experience worship that moves the heart and fuels the soul.",
            "src": "https://das-edge11-live365-dal03.cdnstream.com/a90444",
            "logo": " https://www.eternityready.com/radio/img/LouangeFM.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Contemporary Gospel",
                "Praise/Worship",
                "Spiritual"
            ]
        },
        {
            "name": "My 106\u00b75 WJCR | Just Christ Radio",
            "description": "The Best of Gospel, Contemporary Christian & The Word of God. \"For The Kingdom.\"",
            "src": "https://das-edge09-live365-dal03.cdnstream.com/a69345",
            "logo": " https://www.eternityready.com/radio/img/My 106\u00b75 WJCR - Just Christ Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Contemporary Gospel",
                "Gospel",
                "Praise/Worship"
            ]
        },
        {
            "name": "Anointed.FM",
            "description": "The Kingdom Station",
            "src": "https://das-edge13-live365-dal02.cdnstream.com/a52658",
            "logo": " https://www.eternityready.com/radio/img/Anointed.FM.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian",
                "Gospel",
                "Praise/Worship",
                "Sermons/Services",
                "Traditional Gospel"
            ]
        },
        {
            "name": "PHD 33 GOSPEL RADIO STATION",
            "description": "Sharing the Good News of the Gospel of Jesus Christ with Powerful Preaching, Praying, Praising, Healing and Delivering as in Mark 3:13-15. 13 And he goeth up into a mountain, and calleth unto him whom he would: and they came unto him.\n\n14 And he ordained twelve, that they should be with him, and that he might send them forth to preach,\n\n15 And to have power to heal sicknesses, and to cast out devils:\n\n\n\n",
            "src": "https://das-edge15-live365-dal02.cdnstream.com/a79328",
            "logo": " https://www.eternityready.com/radio/img/PHD 33 GOSPEL RADIO STATION.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Inspirational",
                "Christian",
                "Gospel",
                "Educational"
            ]
        },
        {
            "name": "WCSG Rewind",
            "description": "Favorites from yesterday & today!",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a84687",
            "logo": " https://www.eternityready.com/radio/img/WCSG Rewind.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Decades",
                "Christian",
                "Classic Christian",
                "Oldies",
                "Religious"
            ]
        },
        {
            "name": "STAR Christmas",
            "description": "Christmas songs- to help you feel the love of the season. . .and share it no matter the time of year. ",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a02781",
            "logo": " https://www.eternityready.com/radio/img/STAR Christmas.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian"
            ]
        },
        {
            "name": "Vegas Praise Radio",
            "description": "Vegas Praise is a 24/7 online Gospel station with a mission to Edify, Inspire, and Educate through music and the Word of God.\nWe\u2019re your mobile go-to station, delivering a powerful blend of the nation\u2019s best Traditional, Contemporary, Inspirational Gospel, Christian Rap and more, all in one dynamic stream.\n\nOur goal is to uplift and inspire you through a heartfelt blend of music and talk, carefully crafted to reflect the rich diversity of Las Vegas, Nevada, and beyond. We\u2019re more than a station. We\u2019re a community, connecting you through faith, music, and meaningful messages whenever and wherever you need them. Good vibe. Good music. Good talk. We\u2019re Vegas Praise Radio.\n\n",
            "src": "https://das-edge17-live365-dal02.cdnstream.com/a10411",
            "logo": " https://www.eternityready.com/radio/img/Vegas Praise Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Inspirational",
                "Christian",
                "Christian Rap",
                "Contemporary Gospel",
                "Gospel"
            ]
        },
        {
            "name": "WEEP International Radio",
            "description": "Welcome to WEEP International Radio, where we share uplifting gospel music and powerful messages of hope to inspire and encourage our listeners in their spiritual journey.",
            "src": "https://das-edge17-live365-dal02.cdnstream.com/a78281",
            "logo": " https://www.eternityready.com/radio/img/WEEP International Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Christian Contemporary",
                "Christian",
                "Southern Gospel"
            ]
        },
        {
            "name": "Take Me Back Radio",
            "description": "Newly inspired radio with a focus on worship and praise. Don't let the music sing for you, instead let's worship and praise a deserving God together.  Do you remember the day you first believed?  Take Me Back!!",
            "src": "https://das-edge12-live365-dal02.cdnstream.com/a92243",
            "logo": " https://www.eternityready.com/radio/img/Take Me Back Radio.png",
            "tags": [
                "",
                ""
            ],
            "rating": 5,
            "categories": [
                "Old School",
                "Christian",
                "Gospel"
            ]
        },
    ]
}
function App() {
  const childRef = useRef();

  return (
    <div className="bg-black h-screen w-screen">
      <div className="grid grid-cols-8 gap-4">
        {stations.channels.map(station => 
        <div
          className="w-16 h-16 bg-red-500"
          onClick={() => childRef.current.changeExternalStation(station)}
        >
        </div>
      )}
      </div>
      <EternityRadioPlayer ref={childRef} />
    </div>
  )
}

export default App
