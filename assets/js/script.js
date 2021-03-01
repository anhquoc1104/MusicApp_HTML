// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const STORAGE_KEY = "PLAYER_MUSIC";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem("STORAGE_KEY")) || {},
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem("STORAGE_KEY", JSON.stringify(this.config));
    },

    songs: [
        {
            name: "Giọng Buồn Chơi Vơi",
            singer: "Lệ Thu",
            path:
                "https://data61.chiasenhac.com/downloads/1312/1/1311291-96a46a8d/128/Giong%20Buon%20Choi%20Voi%20-%20Le%20Thu.mp3",
            image: "https://data.chiasenhac.com/data/cover/25/24855.jpg",
        },
        {
            name: "Hỏi Người Còn Nhớ Đến Ta (Pre 75)",
            singer: "Lệ Thu",
            path:
                "https://data01.chiasenhac.com/downloads/1379/1/1378348-3a842e3d/128/Hoi%20Nguoi%20Con%20Nho%20Den%20Ta%20Pre%2075_%20-%20Le%20Th.mp3",
            image: "https://data.chiasenhac.com/data/cover/32/31316.jpg",
        },
        {
            name: "Một Ông Già (Pre 75)",
            singer: "Khánh Ly",
            path:
                "https://data58.chiasenhac.com/downloads/1229/1/1228463-f6734a82/128/Mot%20Ong%20Gia%20Pre%2075_%20-%20Khanh%20Ly.mp3",
            image: "https://data.chiasenhac.com/data/cover/18/17208.jpg",
        },
        {
            name: "Mùa Xuân Đầu Tiên (Pre 75)",
            singer: "Hoàng Oanh",
            path:
                "https://data3.chiasenhac.com/downloads/1783/1/1782064-5a49bdda/128/Mua%20Xuan%20Dau%20Tien%20Pre%2075_%20-%20Hoang%20Oanh.mp3",
            image: "https://chiasenhac.vn/imgs/no_cover.jpg",
        },
        {
            name: "Đường Về Khuya",
            singer: "Thanh Tuyền",
            path:
                "https://data3.chiasenhac.com/downloads/1778/1/1777168-ce7183df/128/Duong%20Ve%20Khuya%20-%20Thanh%20Tuyen.mp3",
            image: "https://data.chiasenhac.com/data/cover/71/70230.jpg",
        },
        {
            name: "Lệ Buồn Nhỏ Xuống Tim Tôi (Pre 75)",
            singer: "Phương Dung",
            path:
                "https://data59.chiasenhac.com/downloads/1241/1/1240155-243390f7/128/Le%20Buon%20Nho%20Xuong%20Tim%20Toi%20Pre%2075_%20-%20Phuo.mp3",
            image: "https://data.chiasenhac.com/data/cover/19/18172.jpg",
        },
        {
            name: "Ghé Lại Một Đêm (Pre 75)",
            singer: "Thanh Vũ; Trung Chỉnh; Phượng Bằng",
            path:
                "https://data00.chiasenhac.com/downloads/1818/1/1817272-54e1243a/128/Ghe%20Lai%20Mot%20Dem%20Pre%2075_%20-%20Thanh%20Vu_%20Trun.mp3",
            image: "https://chiasenhac.vn/imgs/no_cover.jpg",
        },
        {
            name: "Tình Lỡ",
            singer: "Chế Linh; Thanh Tuyền",
            path:
                "https://data52.chiasenhac.com/downloads/1042/1/1041717-615a89e1/128/Tinh%20Lo%20-%20Che%20Linh_%20Thanh%20Tuyen.mp3",
            image: "https://data.chiasenhac.com/data/cover/3/2558.jpg",
        },
        {
            name: "Một Chuyến Bay Đêm",
            singer: "Thanh Thuý",
            path:
                "https://data56.chiasenhac.com/downloads/1174/1/1173362-97779e4d/128/Mot%20Chuyen%20Bay%20Dem%20-%20Thanh%20Thuy.mp3",
            image: "https://data.chiasenhac.com/data/cover/13/12641.jpg",
        },
        {
            name: "Duyên Tình Dang Dở (Pre 75)",
            singer: "Trúc Mai",
            path:
                "https://data58.chiasenhac.com/downloads/1229/1/1228510-a61de498/128/Duyen%20Tinh%20Dang%20Do%20Pre%2075_%20-%20Truc%20Mai.mp3",
            image: "https://data.chiasenhac.com/data/cover/18/17213.jpg",
        },
        {
            name: "Lạnh Trọn Đêm Mưa",
            singer: "Chế Linh",
            path:
                "https://data52.chiasenhac.com/downloads/1036/1/1035410-6a8aba03/128/Lanh%20Tron%20Dem%20Mua%20-%20Che%20Linh.mp3",
            image: "https://data.chiasenhac.com/data/cover/2/1105.jpg",
        },
        {
            name: "Mình Nhớ Nhau Không",
            singer: "Chế Linh",
            path:
                "https://data52.chiasenhac.com/downloads/1042/1/1041890-b0883ae8/128/Minh%20Nho%20Nhau%20Khong%20-%20Che%20Linh.mp3",
            image: "https://data.chiasenhac.com/data/cover/3/2571.jpg",
        },
        {
            name: "Rừng Lá Thấp",
            singer: "Thanh Tuyền",
            path:
                "https://data53.chiasenhac.com/downloads/1069/1/1068921-6f0e89d7/128/Rung%20La%20Thap%20-%20Thanh%20Tuyen.mp3",
            image: "https://data.chiasenhac.com/data/cover/5/4577.jpg",
        },
        {
            name: " Tôi Chưa Có Mùa Xuân",
            singer: "Duy Khánh",
            path:
                "https://data51.chiasenhac.com/downloads/1017/1/1016508-016c9566/128/Toi%20Chua%20Co%20Mua%20Xuan%20-%20Duy%20Khanh.mp3",
            image: "https://data.chiasenhac.com/data/cover/2/1243.jpg",
        },
        {
            name: "Kỷ Niệm Một Mùa Xuân (Pre 75)",
            singer: "Thanh Vũ; Thanh Tuyền",
            path:
                "https://data60.chiasenhac.com/downloads/1280/1/1279228-0729e400/128/Ky%20Niem%20Mot%20Mua%20Xuan%20Pre%2075_%20-%20Thanh%20Vu_.mp3",
            image: "https://data.chiasenhac.com/data/cover/22/21787.jpg",
        },
    ],

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        this.currentIndex = this.config.currentIndex || 0;
        if (this.isRandom) {
            randomBtn.classList.toggle("active", this.isRandom);
        }
        if (this.isRepeat) {
            repeatBtn.classList.toggle("active", this.isRepeat);
        }
    },

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${
                this.currentIndex === index ? "active" : ""
            }" data-index="${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `;
        });
        playlist.innerHTML = htmls.join("");
    },

    handleEvents: function () {
        const cdWidth = cd.offsetWidth;
        const _this = this;

        //handle image zoom scroll
        document.onscroll = function () {
            const scrollTop =
                window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        //Handle thumb cd Rotate
        const cdAnimateRotate = cdThumb.animate(
            [
                {
                    transform: "rotate(360deg)",
                },
            ],
            {
                duration: 10000, //10 second
                iterations: Infinity,
            }
        );

        cdAnimateRotate.pause();

        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdAnimateRotate.play();
        };
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdAnimateRotate.pause();
        };

        //update progress
        audio.ontimeupdate = function () {
            // console.log(audio.currentTime);
            if (audio.duration) {
                const timerPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progress.value = timerPercent;
            }
        };

        //handle seek song
        progress.onchange = function (e) {
            const seekTime = (e.target.value / 100) * audio.duration;
            audio.currentTime = seekTime;
            // console.log(audio.currentTime);
        };

        //next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToSongActive();
        };

        //prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToSongActive();
        };

        //random song
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom", _this.isRandom);
            randomBtn.classList.toggle("active", _this.isRandom);
        };

        //
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat", _this.isRepeat);
            repeatBtn.classList.toggle("active", _this.isRepeat);
        };

        playlist.onclick = function (e) {
            const songElement = e.target.closest(".song:not(.active)");
            const optionElement = e.target.closest(".option");
            if (songElement || optionElement) {
                if (songElement && !optionElement) {
                    _this.currentIndex = parseInt(songElement.dataset.index);
                    _this.setConfig("currentIndex", _this.currentIndex);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                if (optionElement) {
                }
            }
        };
    },

    //Scroll song active to view user
    scrollToSongActive: function () {
        $(".song.active").scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    },

    //random song
    randomSong: function () {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * this.songs.length);
        } while (this.currentIndex === nextIndex);
        this.currentIndex = nextIndex;
        this.setConfig("currentIndex", this.currentIndex);
        this.loadCurrentSong();
    },

    //handle next song
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.setConfig("currentIndex", this.currentIndex);
        this.loadCurrentSong();
    },

    //handle prev song
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length;
        }
        this.setConfig("currentIndex", this.currentIndex);
        this.loadCurrentSong();
    },

    //Define CurentSong property
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    start: function () {
        this.loadConfig();
        this.defineProperties();
        this.handleEvents();
        this.loadCurrentSong();
        this.render();
    },
};

app.start();
