$(document).ready(function () {
    $("header > .srch > .frm > .bd > input").on("focus", function () {
        $("header > .srch > .frm").after(`
            <div class="hlp ptn-abslt bdr-rds-1 lft-cvr wdth-cvr flx-drt-clmn">
                <ul class="btns wdth-cvr flx-drt-clmn">
                    <li class="wdth-cvr flx-cntr">
                        <button class="btn wdth-cvr flx-cntr flx-spc-btwn">
                            <div class="dtls flx-cntr">
                                <div class="icn flx-cntr">
                                    <span style="--fgr-sz: 24px;" class="fgr">
                                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6112 4.62877C11.9437 4.11702 10.1478 4.22819 8.55696 4.94215C7.25938 5.52481 6.17071 6.47548 5.42033 7.66669H7.90625C8.303 7.66669 8.625 7.98869 8.625 8.38544C8.625 8.78219 8.303 9.10419 7.90625 9.10419H2.875V4.07294C2.875 3.67619 3.197 3.35419 3.59375 3.35419C3.9905 3.35419 4.3125 3.67619 4.3125 4.07294V6.73231C5.20854 5.38106 6.47258 4.30198 7.96854 3.63114C9.87754 2.77439 12.0328 2.64119 14.0329 3.25548C16.0339 3.86977 17.7416 5.19131 18.8408 6.9719C19.9391 8.75248 20.3531 10.8723 20.0052 12.9356C19.6564 14.9989 18.5696 16.8648 16.9481 18.1873C15.3257 19.5088 13.2777 20.195 11.1866 20.1193C9.09554 20.0426 7.10413 19.2098 5.58133 17.7742C4.0595 16.3377 3.11075 14.398 2.91333 12.3146C2.87596 11.9198 3.16633 11.569 3.56117 11.5316C3.956 11.4933 4.30675 11.7837 4.34508 12.1785C4.50896 13.915 5.29958 15.5317 6.56842 16.7287C7.83629 17.9247 9.49612 18.6195 11.2393 18.6837C12.9816 18.746 14.6874 18.1739 16.0406 17.0727C17.3918 15.9706 18.2975 14.4153 18.5869 12.696C18.8773 10.9768 18.5332 9.21056 17.617 7.7261C16.7018 6.2426 15.2787 5.14052 13.6112 4.62877ZM12.2188 7.18752C12.2188 6.79077 11.8968 6.46877 11.5 6.46877C11.1033 6.46877 10.7813 6.79077 10.7813 7.18752V11.8699L11.0822 12.0846L14.4363 14.4804C14.7593 14.7114 15.2088 14.6366 15.4388 14.3137C15.6697 13.9907 15.595 13.5413 15.272 13.3113L12.2188 11.1301V7.18752Z" fill="black"/>
                                        </svg>
                                    </span>
                                </div>
                                <div class="tlt flx-cntr">
                                    <text class="txt">Venom</text>
                                </div> 
                            </div>
                            <object class="btn flx-cntr">
                                <button type="button" class="rmv flx-cntr">
                                    <text class="txt">remove</text>
                                </button>
                            </object>
                        </button>
                    </li>
                </ul>
            </div>    
        `);
    });

    var isPermitted = true;

    $("html").on("mousedown", "header > .srch > .hlp > ul > li > button", function () {
        isPermitted = false;
    });

    $("html").on("click", "header > .srch > .hlp > ul > li > button", function () {
        $("header > .srch > .frm > .bd > input").attr("value", $(this).find(".dtls > .tlt > .txt").text());
        $("header > .srch > .frm").next(".hlp").remove();
        $("header > .srch > .frm > .btn > button").click();
        isPermitted = true;
    });

    $("header > .srch > .frm > .bd > input").on("blur", function () {
        if (isPermitted) {
            $("header > .srch > .frm").next(".hlp").remove();
        }
    });
});