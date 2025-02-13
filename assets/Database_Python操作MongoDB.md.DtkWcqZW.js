import{_ as i,c as a,o as t,ag as n}from"./chunks/framework.BmLMQRXF.js";const g=JSON.parse('{"title":"Python操作MongoDB","description":"","frontmatter":{},"headers":[],"relativePath":"Database/Python操作MongoDB.md","filePath":"Database/Python操作MongoDB.md"}'),p={name:"Database/Python操作MongoDB.md"};function h(l,s,e,k,o,d){return t(),a("div",null,s[0]||(s[0]=[n(`<h1 id="python操作mongodb" tabindex="-1">Python操作MongoDB <a class="header-anchor" href="#python操作mongodb" aria-label="Permalink to &quot;Python操作MongoDB&quot;">​</a></h1><p>pymongo提供了mongdb和python交互的所有方法 安装方式</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pymongo</span></span></code></pre></div><h2 id="使用pymongo" tabindex="-1">使用pymongo <a class="header-anchor" href="#使用pymongo" aria-label="Permalink to &quot;使用pymongo&quot;">​</a></h2><ul><li><p>导入pymongo并选择要操作的集合 数据库和集合有会自动创建</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pymongo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MongoClient </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">client </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MongoClient(host,port) collection </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> client[db名][集合名]</span></span></code></pre></div></li><li><p>添加一条数据</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ret </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> collection.insert_one({</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test10010&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;age&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">33</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}) </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ret)</span></span></code></pre></div></li><li><p>添加多条数据</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">item_list </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [{</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test1000</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.format(i)} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> range</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)]     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#insert_many接收一个列表，列表中为所有需要插入的字典 </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">t </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> collection.insert_many(item_list)</span></span></code></pre></div></li><li><p>查找一条数据</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#find_one查找并且返回一个结果,接收一个字典形式的条件 </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">t </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> collection.find_one({</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test10005&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div></li><li><p>查找全部数据</p><p>结果是一个Cursor游标对象，是一个可迭代对象，可以类似读文件的指针，但是只能够进行一次读取</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#find返回所有满足条件的结果，如果条件为空，则返回数据库的所有 </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">t </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> collection.find({</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test10005&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})     </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#结果是一个Cursor游标对象，是一个可迭代对象，可以类似读文件的指针， </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t:     </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(i)</span></span></code></pre></div></li><li><p>更新一条数据 注意使用<code>$set</code>命令</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#update_one更新一条数据 </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">collection.update_one({</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test10005&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},{</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;$set&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:{</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;new_test10005&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}})</span></span></code></pre></div></li><li><p>更行全部数据</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># update_one更新全部数据 </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">collection.update_many({</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test10005&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},{</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;$set&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:{</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;new_test10005&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}})</span></span></code></pre></div></li><li><p>删除一条数据</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#delete_one删除一条数据 </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">collection.delete_one({</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test10010&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div></li><li><p>删除全部数据</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#delete_may删除所有满足条件的数据 </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">collection.delete_many({</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test10010&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div></li></ul>`,5)]))}const r=i(p,[["render",h]]);export{g as __pageData,r as default};
