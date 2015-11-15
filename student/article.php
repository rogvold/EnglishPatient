<?php
/**
 * Created by PhpStorm.
 * User: sabir
 * Date: 03.01.15
 * Time: 12:49
 */

require '../php/autoload.php';

use Parse\ParseObject;
use Parse\ParseQuery;
use Parse\ParseClient;
use Parse\ParseACL;
use Parse\ParsePush;
use Parse\ParseUser;
use Parse\ParseInstallation;
use Parse\ParseException;
use Parse\ParseAnalytics;
use Parse\ParseFile;
use Parse\ParseCloud;


if (isset($_GET['id']) == false){
    header('Location: http://article.englishpatient.org');
}

$articleId = $_GET["id"];

ParseClient::initialize( "h1QhtsSjeoyQSa8RDQBDPvgbnI7Ix6nadHTsepwN", "Frq9bS1aVvjmwFqPvZph6K3rDzGMfkUUiR5yTwoi", "PuOZIYv6eHyqXLS0hc19bHCfO1ZrdPgA9cNbMpBI" );

$query = new ParseQuery("PatientArticle");
$article = $query->get($articleId);
$name = $article->get("name");
$ownerId = $article->get("ownerId");
$content = $article->get("content");
$description = $article->get("description");
$patientCreatedAt = $article->getCreatedAt();

$contentNoTags = strip_tags($content);

$pos=strpos($contentNoTags, ' ', 200);
substr($contentNoTags,0,$pos);

$imgSrc = $article->get("imgSrc");
$vocabulary = implode(", ", $article->get("vocabulary"));

//$userId = $article->get("ownerId");
//$userQuery = new ParseQuery(ParseUser);
//$user = $userQuery->get($userId);

?>

<!DOCTYPE html>
<html class="no-js" lang="">

<head>
    <!-- meta -->
    <meta charset="utf-8">
    <meta name="description" content="<?php echo $description ?>">
    <meta name="Keywords" content="English, английский, уроки английского, английский по видео, учить английский, <?php echo $vocabulary ?>">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">
    <link href="home/img/logo_mini.png" rel="shortcut icon" type="image/x-icon" />
    <!-- /meta -->

    <meta property="og:image" content="<?php echo $article->get("imgSrc") ?>"/>
    <meta property="og:title" content="<?php echo str_replace('"', "'", $name) ?>"/>
    <meta property="og:description" content="<?php echo $description ?>"/>
    <meta property="og:site_name" content="English Patient - boost your productivity in learning English"/>
    <meta property="og:url" content="http://article.englishpatient.org/article.php?id=<?php echo $articleId ?>"/>
    <meta property="og:type" content="website"/>

    <link rel="image_src" href="<?php echo $article->get("imgSrc") ?>" />

    <title>
        <?php echo $name ?>
    </title><link rel="icon" href="http://beta.englishpatient.org/home/img/logo_mini.png" />

    <!-- core scripts -->
    <script src="../home/plugins/jquery-1.11.1.min.js"></script>
    <script src="../home/bootstrap/js/bootstrap.js"></script>
    <script src="../home/plugins/jquery.slimscroll.min.js"></script>
    <script src="../home/plugins/jquery.easing.min.js"></script>
    <script src="../home/plugins/appear/jquery.appear.js"></script>
    <script src="../home/plugins/jquery.placeholder.js"></script>
    <script src="../home/plugins/fastclick.js"></script>


    <!-- /core scripts -->

    <!-- page level plugin styles -->
    <!-- /page level plugin styles -->

    <!-- core styles -->
    <link rel="stylesheet" href="../home/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../home/css/font-awesome.css">
    <link rel="stylesheet" href="../home/css/themify-icons.css">
    <link rel="stylesheet" href="../home/css/animate.min.css">

    <link rel="stylesheet" href="../home/plugins/medium/medium-editor.css">
    <link rel="stylesheet" href="../home/plugins/medium-plugin/css/medium-editor-insert-plugin.min.css">

    <!-- /core styles -->

    <script src="home/js/parse-1.2.18.min.js" ></script>
    <script src="home/js/moment.js" ></script>



    <!-- template styles -->
    <link rel="stylesheet" href="../home/css/skins/palette.css">
    <link rel="stylesheet" href="../home/css/fonts/font.css">
    <link rel="stylesheet" href="../home/css/main.css">

    <link rel="stylesheet" href="css/custom.css">
    <link rel="stylesheet" href="home/plugins/toastr/toastr.min.css">
    <!-- template styles -->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- load modernizer -->
    <script src="plugins/modernizr.js"></script>


</head>

<!-- body -->

<body>

<div class="overlay bg-color"></div>

<div class="app horizontal-layout">
    <!-- top header -->
    <header class="header header-fixed navbar">

        <div class="brand">
            <a href="index.php?userId=<?php echo $ownerId ?>" class="navbar-brand">
                <img src="home/img/logo_mini.png" alt="">
                    <span class="heading-font">
                        English Patient
                    </span>
            </a>
        </div>


        <ul class="nav navbar-nav navbar-right">

            <li class="off-right">

                <script type="text/javascript" src="//yastatic.net/share/share.js" charset="utf-8"></script>

                <div class="yashare-auto-init" style="" data-yashareL10n="ru" data-yashareType="small" data-yashareQuickServices="vkontakte,facebook,twitter,odnoklassniki,moimir,gplus" data-yashareImage="<?php echo $imgSrc ?>" data-yashareDescription="<?php echo $description ?>" data-yashareTheme="counter"></div>


            </li>

        </ul>
    </header>
    <!-- /top header -->

    <section class="layout">


        <!-- main content -->
        <section class="main-content">

            <!-- content wrapper -->
            <div class="content-wrap">

                <!-- inner content wrapper -->
                <div class="wrapper ">

                    <div id="patientArticle" class="col-md-6 col-md-offset-3" itemscope itemtype="http://schema.org/Article"  >
                        <div id="articleHead" class="pb10 bb">
                             <span class="pull-right">
                                    <i class="ti-gallery pull-right" id="previewButton" ></i>
                            </span>

                            <div id="articleName">
                                <h1 itemprop="name" >
                                    <?php echo $name ?>
                                </h1>

                            </div>

                            <div id="articleDate" itemprop="datePublished" content="<?php echo date_format($patientCreatedAt, 'Y-m-d') ?>" >

                            </div>

                        </div>

                        <div id="articleContent" itemprop="articleSection" class="patientArticle production pt10" >
                            <?php echo $content ?>
                        </div>
                    </div>

                    <div id="commentsBlock" class="col-md-6 col-md-offset-3" >
                        <div id="mc-container"></div>
                        <script type="text/javascript">
                            cackle_widget = window.cackle_widget || [];
                            cackle_widget.push({widget: 'Comment', id: 32575});
                            (function() {
                                var mc = document.createElement('script');
                                mc.type = 'text/javascript';
                                mc.async = true;
                                mc.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cackle.me/widget.js';
                                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mc, s.nextSibling);
                            })();
                        </script>
                    </div>

                    <div id="linksPlaceholder">

                    </div>



                </div>
                <!-- /inner content wrapper -->
            </div>
            <!-- /content wrapper -->
            <a class="exit-offscreen"></a>
        </section>
        <!-- /main content -->
    </section>

</div>


<div class="gallery-loader hide">
    <div class="loader"></div>
</div>

<div id="previewOverlay" class="hide" >
    <div class="row mt10">
        <div class="container bb" style="padding-top: 55px;" >
            <div class="col-xs-12" style="display: block; text-align: right; margin-bottom: 10px;">
                <a class="pull-right" href="javascript: void(0);"
                   onclick="hidePreviewOverlay(); $('#mediaBlock').html('');" >
                    <i class="ti-close" ></i>
                    ЗАКРЫТЬ
                </a>
            </div>

            <div class="col-xs-3">
                <div id="mediaListPlaceholder">
                    <ul id="mediaList">

                    </ul>
                    <div id="controlsBlock" class="mt10 mb10" style="text-align: left; padding-left: 25px;">
                        <button class="btn btn-primary" id="prevButton" ><i class="ti-arrow-left" ></i>PREV</button>
                        <button class="btn btn-primary" id="nextButton" >NEXT<i class="ti-arrow-right" ></i></button>
                    </div>
                </div>
            </div>

            <div class="col-xs-9">


                <div id="mediaBlock">

                </div>
                <div id="transcriptBlock">

                </div>




            </div>

        </div>
    </div>
</div>

<div style="display: block; position: absolute; bottom: 0px; cursor:pointer; right: 0px; width: 50px; height: 50px; " onclick="window.location.href=window.location.href + '&voos=1'" >

</div>


<div class="modal fade" id="translateModal" style="z-index: 100000000;" tabindex="1000" role="dialog"  aria-hidden="true">
    <div class="modal-dialog" style="" >
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" ></h4>
            </div>
            <div class="modal-body">

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">ЗАКРЫТЬ</button>
            </div>

        </div>
    </div>
</div>


<!-- page level scripts -->
<!-- /page level scripts -->

<!-- template scripts -->
<script src="home/js/offscreen.js"></script>
<script src="home/plugins/toastr/toastr.min.js"></script>
<script src="home/js/main.js"></script>
<script src="home/js/custom/howler.js"></script>
<script src="home/js/parse-1.2.18.min.js"></script>
<script src="home/js/custom/common.js"></script>
<script src="js/TranslateManager.js"></script>
<script src="js/MediaViewManager.js"></script>
<!-- /template scripts -->

<!-- page script -->
<!-- /page script -->

<script>




    $(function(){
        article = {
            name: "<?php echo $name; ?>",
            createdAt: <?php echo $patientCreatedAt->getTimestamp(); ?>
        }

        moment.lang('ru');
        $('#articleDate').html(moment(article.createdAt * 1000).format('LLL'));

        MVM = new MediaViewManager();
        MVM.init();

        TM = new TranslateManager();
        TM.init();

        $('#articleContent p, #articleContent pre, #articleContent pre p, #articleContent p pre').each(function(){
            var html = $(this).html();
            html = TM.getTranslatableHtml(html);
            $(this).html(html);
        });
    });
</script>

<!-- Yandex.Metrika counter -->
<script type="text/javascript">
    (function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
            try {
                w.yaCounter27928491 = new Ya.Metrika({id:27928491,
                    webvisor:true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true});
            } catch(e) { }
        });

        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
    })(document, window, "yandex_metrika_callbacks");
</script>
<noscript><div><img src="//mc.yandex.ru/watch/27928491" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-58659208-1', 'auto');
    ga('send', 'pageview');

</script>

<!--LiveInternet counter-->
<script type="text/javascript"><!--
    document.write("<a href='//www.liveinternet.ru/click' "+
    "target=_blank><img style="display: none;" src='//counter.yadro.ru/hit?t52.6;r"+
    escape(document.referrer)+((typeof(screen)=="undefined")?"":
    ";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
        screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+
    ";"+Math.random()+
    "' alt='' title='LiveInternet: показано число просмотров и"+
    " посетителей за 24 часа' "+
    "border='0' width='88' height='31'><\/a>")
    //--></script><!--/LiveInternet-->

</body>
<!-- /body -->

</html>
