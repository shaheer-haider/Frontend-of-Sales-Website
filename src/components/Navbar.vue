<template>
    <div id="navbar">
        <h1 id="brandTitle">Sales Manager</h1>
        <ul id="navList">
            <li class="navLi">
                <router-link to="/" class="routerLinks">
                    <p class="navItemsPara">Add Sales</p>
                </router-link>
            </li>
            <li class="navLi">
                <router-link to="/report/Daily" class="routerLinks">
                    <p class="navItemsPara">Daily Report</p>
                </router-link>
            </li>
            <li class="navLi">
                <router-link to="/report/Weekly" class="routerLinks">
                    <p class="navItemsPara">Weekly Report</p>
                </router-link>
            </li>
            <li class="navLi">
                <router-link to="/report/Monthly" class="routerLinks">
                    <p class="navItemsPara">Monthly Report</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<style>
    #navbar {
        border-right: 2px solid black;
        padding-top: 20px;
        background-color: #0d6efd;
    }

    #brandTitle {
        margin-left: 20px;
        text-shadow: 1px 1px 1px rgb(155, 187, 255);
    }

    #navList {
        list-style: none;
        padding-top: 10px;
    }

    .navLi {
        height: 50px;
        padding-left: 25px;
        padding-top: 14px;
        border-bottom: 1px solid black;
        transition: background-color 300ms;
    }

    .navLi:first-of-type {
        border-top: 1px solid black;
    }

    .routerLinks {
        display: block;
        height: 100%;
        text-decoration: none;
    }

    .navItemsPara {
        color: white;
        transition: font-size 300ms;
    }

    .navLi:hover .navItemsPara {
        font-size: 18px;
    }

    .navLi:hover {
        background-color: #0051ca;
    }

    #navbar {
        padding-bottom: 10px;
        width: 250px;
        vertical-align: middle;
        height: 100vh;
    }

    /* only when width is less than 800px */
    @media only screen and (max-width: 800px) {
        main {
            flex-direction: column;
        }

        #navbar {
            width: 100vw;
            height: 275px;
        }
        .navItemsPara {
            font-size: 15px
        }

        .navLi:hover .navItemsPara {
            font-size: 16px;
        }
    }
</style>