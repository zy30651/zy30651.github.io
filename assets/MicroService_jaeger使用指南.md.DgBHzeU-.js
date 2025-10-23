import{_ as a,c as i,o as n,ag as e}from"./chunks/framework.B-XtCDNB.js";const c=JSON.parse('{"title":"链路追踪jaeger","description":"","frontmatter":{},"headers":[],"relativePath":"MicroService/jaeger使用指南.md","filePath":"MicroService/jaeger使用指南.md"}'),t={name:"MicroService/jaeger使用指南.md"};function r(p,s,l,h,o,k){return n(),i("div",null,[...s[0]||(s[0]=[e(`<h1 id="链路追踪jaeger" tabindex="-1">链路追踪jaeger <a class="header-anchor" href="#链路追踪jaeger" aria-label="Permalink to &quot;链路追踪jaeger&quot;">​</a></h1><h2 id="链路追踪jaeger安装" tabindex="-1">链路追踪jaeger安装 <a class="header-anchor" href="#链路追踪jaeger安装" aria-label="Permalink to &quot;链路追踪jaeger安装&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -dit</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jaeger</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> COLLECTOR_ZIPKIN_HOST_PORT=:9411</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 6831:6831/udp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 6832:6832/udp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 5778:5778</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 16686:16686</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 4317:4317</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 4318:4318</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 14250:14250</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 14268:14268</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 14269:14269</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 9411:9411</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  jaegertracing/all-in-one:1.58</span></span></code></pre></div><p>访问网址(主要使用search)：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http://localhost:16686/search</span></span></code></pre></div><h2 id="jaeger组成" tabindex="-1">Jaeger组成 <a class="header-anchor" href="#jaeger组成" aria-label="Permalink to &quot;Jaeger组成&quot;">​</a></h2><p><strong>Jaeger Client</strong> ：会将数据发送到jaeger agent</p><p><strong>Agent</strong>：监听在udp端口上接受span数据的网络守护进程，它将数据批量发送给controller。它被设计成基础组件，部署到所有的宿主机上。Agent将client library和collector解耦，为client library屏蔽了路由和发现collector的细节</p><p><strong>Collector</strong>：接受agent发送来的数据，将数据写入后端存储。collector被设计成无状态的组件；因此可以同时运行任意数量的collector</p><p><strong>Query</strong>：接受查询请求，然后匆匆后端存储系统中检索trace并通过ui进行展示。Query是无状态的，可以启动多个实例；通常部署在nginx这样的负载均衡器后面</p><p>分布式追踪系统发展很快，核心步骤一般是3个：<strong>代码埋点，数据存储，查询展示</strong></p><h2 id="单文件使用链路追踪" tabindex="-1">单文件使用链路追踪 <a class="header-anchor" href="#单文件使用链路追踪" aria-label="Permalink to &quot;单文件使用链路追踪&quot;">​</a></h2><p>单文件使用single span</p><p><a href="https://github.com/jaegertracing/jaeger-client-python" target="_blank" rel="noreferrer">python-jaeger驱动</a></p><pre><code>import requests
import logging, time
from jaeger_client import Config
from random import randint

if __name__ == &quot;__main__&quot;:
    log_level = logging.DEBUG
    logging.getLogger(&#39;&#39;).handlers = []
    logging.basicConfig(format=&#39;%(asctime)s %(message)s&#39;, level=log_level)

    config = Config(
        # 可以从yaml中读取；比如Nacos
        config={
            &#39;sampler&#39;: {
                &#39;type&#39;: &#39;const&#39;,  # 全部
                &#39;param&#39;: 1,  # 1开启全部采样，0关闭全部采样
            },
            &#39;local_agent&#39;: {
                &#39;reporting_host&#39;: &#39;172.17.0.2&#39;,
                &#39;reporting_port&#39;: 6831
            },
            &#39;logging&#39;: True,
        },
        # 把哪些链接放在这个应用名下
        service_name=&#39;mxshop&#39;,
        validate=True,
    )
    # this call also sets opentracing.tracer
    tracer = config.initialize_tracer()
    # get_span=tracer.start_span(&#39;getData&#39;)
    # requests.get(&quot;https://www.imooc.com&quot;)
    # # finish会保存请求的时间
    # get_span.finish()
    with tracer.start_span(&#39;spider&#39;) as spider_span:
        with tracer.start_span(&#39;TestSpan&#39;, child_of=spider_span) as span:
            requests.get(&quot;https://www.imooc.com&quot;)
        time.sleep(randint(0,9)*0.2)
        with tracer.start_span(&#39;parser&#39;, child_of=spider_span) as parser_span:
            with tracer.start_span(&#39;parser1&#39;, child_of=parser_span) as span1:
                time.sleep(randint(0, 9) * 0.1)
            time.sleep(randint(0, 9) * 0.1)
            with tracer.start_span(&#39;parser2&#39;, child_of=parser_span) as span2:
                time.sleep(randint(0, 9) * 0.1)

    # 不sleep，可能查不到；因为span.finish()是异步请求，交给tornado的IOLoop
    time.sleep(2)
    # flush any buffered spans
    tracer.close()
</code></pre>`,15)])])}const d=a(t,[["render",r]]);export{c as __pageData,d as default};
