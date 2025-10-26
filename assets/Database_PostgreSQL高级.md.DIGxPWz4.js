import{_ as p,c as t,o as l,ag as e,j as a,a as s}from"./chunks/framework.B-XtCDNB.js";const T=JSON.parse('{"title":"PostgreSQL高级","description":"","frontmatter":{},"headers":[],"relativePath":"Database/PostgreSQL高级.md","filePath":"Database/PostgreSQL高级.md"}'),d={name:"Database/PostgreSQL高级.md"};function i(c,n,o,r,E,h){return l(),t("div",null,[...n[0]||(n[0]=[e(`<h1 id="postgresql高级" tabindex="-1">PostgreSQL高级 <a class="header-anchor" href="#postgresql高级" aria-label="Permalink to &quot;PostgreSQL高级&quot;">​</a></h1><h3 id="约束" tabindex="-1">约束 <a class="header-anchor" href="#约束" aria-label="Permalink to &quot;约束&quot;">​</a></h3><p>用于指定表中的数据规则</p><p>如果存在违反约束的数据行为，行为会被约束终止。</p><p>约束可以在创建表时指定（通过 CREATE TABLE 语句），或者在表创建之后指定（通过 ALTER TABLE 语句）</p><p>约束确保了数据库中数据的准确性和可靠性</p><p>常用的约束。</p><ul><li><strong>NOT NULL</strong>：指示某列不能存储 NULL 值。</li><li><strong>UNIQUE</strong>：确保某列的值都是唯一的。</li><li>PRIMARY Key：主键，数据表中每一条记录的唯一标识。</li><li>FOREIGN Key：外键约束，指定列(或一组列)中的值必须匹配另一个表的某一行中出现的值</li><li>CHECK： 保证列中的值符合指定的条件。</li><li>EXCLUSION ：排他约束，保证如果将任何两行的指定列或表达式使用指定操作符进行比较，至少其中一个操作符比较将会返回 false 或空值。</li></ul><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE TABLE COMPANY1(</span></span>
<span class="line"><span>   ID INT PRIMARY KEY     NOT NULL,</span></span>
<span class="line"><span>   NAME           TEXT    NOT NULL UNIQUE,</span></span>
<span class="line"><span>   AGE            INT     NOT NULL,</span></span>
<span class="line"><span>   ADDRESS        CHAR(50),</span></span>
<span class="line"><span>   SALARY         REAL    CHECK(SALARY &gt; 0),</span></span>
<span class="line"><span>    EXCLUDE USING gist</span></span>
<span class="line"><span>   (NAME WITH =,  -- 如果满足 NAME 相同，AGE 不相同则不允许插入，否则允许插入</span></span>
<span class="line"><span>   AGE WITH &lt;&gt;)   -- 其比较的结果是如果整个表边式返回 true，则不允许插入，否则允许</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span>CREATE TABLE DEPARTMENT1(</span></span>
<span class="line"><span>   ID INT PRIMARY KEY      NOT NULL,</span></span>
<span class="line"><span>   DEPT           CHAR(50) NOT NULL,</span></span>
<span class="line"><span>   EMP_ID         INT      references COMPANY1(ID)</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span># 删除约束</span></span>
<span class="line"><span>ALTER TABLE table_name DROP CONSTRAINT some_name;</span></span></code></pre></div><h3 id="join连接" tabindex="-1">Join连接 <a class="header-anchor" href="#join连接" aria-label="Permalink to &quot;Join连接&quot;">​</a></h3><p>JOIN 子句用于把来自两个或多个表的行结合起来，基于这些表之间的共同字段</p><ul><li>CROSS JOIN ：交叉连接</li><li>INNER JOIN：内连接</li><li>LEFT OUTER JOIN：左外连接</li><li>RIGHT OUTER JOIN：右外连接</li><li>FULL OUTER JOIN：全外连接</li></ul><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>select * from COMPANY;</span></span>
<span class="line"><span> id | name  | age | address   | salary</span></span>
<span class="line"><span>----+-------+-----+-----------+--------</span></span>
<span class="line"><span>  1 | Paul  |  32 | California|  20000</span></span>
<span class="line"><span>  2 | Allen |  25 | Texas     |  15000</span></span>
<span class="line"><span>  3 | Teddy |  23 | Norway    |  20000</span></span>
<span class="line"><span>  4 | Mark  |  25 | Rich-Mond |  65000</span></span>
<span class="line"><span>  5 | David |  27 | Texas     |  85000</span></span>
<span class="line"><span>  6 | Kim   |  22 | South-Hall|  45000</span></span>
<span class="line"><span>  7 | James |  24 | Houston   |  10000</span></span>
<span class="line"><span># 创建新表</span></span>
<span class="line"><span>CREATE TABLE DEPARTMENT(</span></span>
<span class="line"><span>   ID INT PRIMARY KEY      NOT NULL,</span></span>
<span class="line"><span>   DEPT           CHAR(50) NOT NULL,</span></span>
<span class="line"><span>   EMP_ID         INT      NOT NULL</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span>INSERT INTO DEPARTMENT (ID, DEPT, EMP_ID) VALUES (1, &#39;IT Billing&#39;, 1 );</span></span>
<span class="line"><span>INSERT INTO DEPARTMENT (ID, DEPT, EMP_ID) VALUES (2, &#39;Engineering&#39;, 2 );</span></span>
<span class="line"><span>INSERT INTO DEPARTMENT (ID, DEPT, EMP_ID) VALUES (3, &#39;Finance&#39;, 7 );</span></span>
<span class="line"><span>id | dept        | emp_id</span></span>
<span class="line"><span>----+-------------+--------</span></span>
<span class="line"><span>  1 | IT Billing  |  1</span></span>
<span class="line"><span>  2 | Engineering |  2</span></span>
<span class="line"><span>  3 | Finance     |  7</span></span></code></pre></div><h5 id="交叉连接" tabindex="-1">交叉连接 <a class="header-anchor" href="#交叉连接" aria-label="Permalink to &quot;交叉连接&quot;">​</a></h5><p>把第一个表的每一行与第二个表的每一行进行匹配。如果两个输入表分别有 x 和 y 行，则结果表有 x*y 行。</p><p>由于交叉连接（CROSS JOIN）有可能产生非常大的表，使用时必须谨慎，只在适当的时候使用它们</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT EMP_ID, NAME, DEPT FROM COMPANY CROSS JOIN DEPARTMENT;</span></span>
<span class="line"><span> emp_id | name  |                        dept</span></span>
<span class="line"><span>--------+-------+----------------------------------------------------</span></span>
<span class="line"><span>      1 | ww    | IT Billing</span></span>
<span class="line"><span>      1 | James | IT Billing</span></span>
<span class="line"><span>      1 | James | IT Billing</span></span>
<span class="line"><span>      1 | James | IT Billing</span></span>
<span class="line"><span>      1 | James | IT Billing</span></span>
<span class="line"><span>      1 | w     | IT Billing</span></span>
<span class="line"><span>      1 | ww    | IT Billing</span></span>
<span class="line"><span>      2 | ww    | Engineering</span></span>
<span class="line"><span>      2 | James | Engineering</span></span>
<span class="line"><span>      2 | James | Engineering</span></span>
<span class="line"><span>      2 | James | Engineering</span></span>
<span class="line"><span>      2 | James | Engineering</span></span>
<span class="line"><span>      2 | w     | Engineering</span></span>
<span class="line"><span>      2 | ww    | Engineering</span></span>
<span class="line"><span>      7 | ww    | Finance</span></span>
<span class="line"><span>      7 | James | Finance</span></span>
<span class="line"><span>      7 | James | Finance</span></span></code></pre></div><h5 id="内连接" tabindex="-1">内连接 <a class="header-anchor" href="#内连接" aria-label="Permalink to &quot;内连接&quot;">​</a></h5><p>根据连接谓词结合两个表（table1 和 table2）的列值来创建一个新的结果表。查询会把 table1 中的每一行与 table2 中的每一行进行比较，找到所有满足连接谓词的行的匹配对。</p><p>当满足连接谓词时，A 和 B 行的每个匹配对的列值会合并成一个结果行。</p><p>内连接（INNER JOIN）是最常见的连接类型，是默认的连接类型。</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT EMP_ID, NAME, DEPT FROM COMPANY INNER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;</span></span>
<span class="line"><span> emp_id | name |                        dept</span></span>
<span class="line"><span>--------+------+----------------------------------------------------</span></span>
<span class="line"><span>      2 | ww   | Engineering</span></span></code></pre></div><h5 id="左外连接" tabindex="-1">左外连接 <a class="header-anchor" href="#左外连接" aria-label="Permalink to &quot;左外连接&quot;">​</a></h5><p>外部连接是内部连接的扩展。SQL 标准定义了三种类型的外部连接: LEFT、RIGHT 和 FULL, PostgreSQL 支持所有这些。</p><p>对于左外连接，首先执行一个内连接。然后，对于表 T1 中不满足表 T2 中连接条件的每一行，其中 T2 的列中有 null 值也会添加一个连接行。因此，连接的表在 T1 中每一行至少有一行。</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT EMP_ID, NAME, DEPT FROM COMPANY </span></span>
<span class="line"><span>LEFT OUTER JOIN DEPARTMENT </span></span>
<span class="line"><span>ON COMPANY.ID = DEPARTMENT.EMP_ID;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>emp_id | name  |                        dept</span></span>
<span class="line"><span>--------+-------+----------------------------------------------------</span></span>
<span class="line"><span>      2 | ww    | Engineering</span></span>
<span class="line"><span>        | James |</span></span>
<span class="line"><span>        | James |</span></span>
<span class="line"><span>        | ww    |</span></span>
<span class="line"><span>        | James |</span></span>
<span class="line"><span>        | w     |</span></span>
<span class="line"><span>        | James |</span></span></code></pre></div><h5 id="右外连接" tabindex="-1">右外连接 <a class="header-anchor" href="#右外连接" aria-label="Permalink to &quot;右外连接&quot;">​</a></h5><p>首先，执行内部连接。然后，对于表T2中不满足表T1中连接条件的每一行，其中T1列中的值为空也会添加一个连接行。这与左联接相反;对于T2中的每一行，结果表总是有一行</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT EMP_ID, NAME, DEPT FROM COMPANY </span></span>
<span class="line"><span>RIGHT OUTER JOIN DEPARTMENT </span></span>
<span class="line"><span>ON COMPANY.ID = DEPARTMENT.EMP_ID;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> emp_id | name |                        dept</span></span>
<span class="line"><span>--------+------+----------------------------------------------------</span></span>
<span class="line"><span>      1 |      | IT Billing</span></span>
<span class="line"><span>      2 | ww   | Engineering</span></span>
<span class="line"><span>      7 |      | Finance</span></span></code></pre></div><h5 id="外连接" tabindex="-1">外连接 <a class="header-anchor" href="#外连接" aria-label="Permalink to &quot;外连接&quot;">​</a></h5><p>首先，执行内部连接。然后，对于表 T1 中不满足表 T2 中任何行连接条件的每一行，如果 T2 的列中有 null 值也会添加一个到结果中。此外，对于 T2 中不满足与 T1 中的任何行连接条件的每一行，将会添加 T1 列中包含 null 值的到结果中。</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT EMP_ID, NAME, DEPT FROM COMPANY </span></span>
<span class="line"><span>FULL OUTER JOIN DEPARTMENT </span></span>
<span class="line"><span>ON COMPANY.ID = DEPARTMENT.EMP_ID;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> emp_id | name  |                        dept</span></span>
<span class="line"><span>--------+-------+----------------------------------------------------</span></span>
<span class="line"><span>      1 |       | IT Billing</span></span>
<span class="line"><span>      2 | ww    | Engineering</span></span>
<span class="line"><span>      7 |       | Finance</span></span>
<span class="line"><span>        | James |</span></span>
<span class="line"><span>        | James |</span></span>
<span class="line"><span>        | ww    |</span></span>
<span class="line"><span>        | James |</span></span>
<span class="line"><span>        | w     |</span></span>
<span class="line"><span>        | James |</span></span></code></pre></div><h3 id="union操作符" tabindex="-1">Union操作符 <a class="header-anchor" href="#union操作符" aria-label="Permalink to &quot;Union操作符&quot;">​</a></h3><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT EMP_ID, NAME, DEPT FROM COMPANY INNER JOIN DEPARTMENT</span></span>
<span class="line"><span>   ON COMPANY.ID = DEPARTMENT.EMP_ID;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> emp_id | name |                        dept</span></span>
<span class="line"><span>--------+------+----------------------------------------------------</span></span>
<span class="line"><span>      2 | ww   | Engineering</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>SELECT EMP_ID, NAME, DEPT FROM COMPANY LEFT OUTER JOIN DEPARTMENT</span></span>
<span class="line"><span>    ON COMPANY.ID = DEPARTMENT.EMP_ID;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> emp_id | name  |                        dept</span></span>
<span class="line"><span>--------+-------+----------------------------------------------------</span></span>
<span class="line"><span>      2 | ww    | Engineering</span></span>
<span class="line"><span>        | James |</span></span>
<span class="line"><span>        | James |</span></span>
<span class="line"><span>        | ww    |</span></span>
<span class="line"><span>        | James |</span></span>
<span class="line"><span>        | w     |</span></span>
<span class="line"><span>        | James |</span></span></code></pre></div><p>UNION 操作符用于合并两个或多个 SELECT 语句的结果集。</p><p>请注意，UNION 内部的每个 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据类型。同时，每个 SELECT 语句中的列的顺序必须相同。</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT EMP_ID, NAME, DEPT FROM COMPANY INNER JOIN DEPARTMENT</span></span>
<span class="line"><span>   ON COMPANY.ID = DEPARTMENT.EMP_ID</span></span>
<span class="line"><span>   UNION</span></span>
<span class="line"><span>SELECT EMP_ID, NAME, DEPT FROM COMPANY LEFT OUTER JOIN DEPARTMENT</span></span>
<span class="line"><span>    ON COMPANY.ID = DEPARTMENT.EMP_ID;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> emp_id | name  |                        dept</span></span>
<span class="line"><span>--------+-------+----------------------------------------------------</span></span>
<span class="line"><span>        | w     |</span></span>
<span class="line"><span>        | James |</span></span>
<span class="line"><span>        | ww    |</span></span>
<span class="line"><span>      2 | ww    | Engineering</span></span></code></pre></div><h5 id="union-all-子句" tabindex="-1">UNION ALL 子句 <a class="header-anchor" href="#union-all-子句" aria-label="Permalink to &quot;UNION ALL 子句&quot;">​</a></h5><p>UNION ALL 操作符可以连接两个有重复行的 SELECT 语句，通常情况下，UNION 操作符选取不同的值。如果允许重复的值，请使用 UNION ALL。</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT EMP_ID, NAME, DEPT FROM COMPANY INNER JOIN DEPARTMENT</span></span>
<span class="line"><span>   ON COMPANY.ID = DEPARTMENT.EMP_ID</span></span>
<span class="line"><span>   UNION ALL</span></span>
<span class="line"><span>SELECT EMP_ID, NAME, DEPT FROM COMPANY LEFT OUTER JOIN DEPARTMENT</span></span>
<span class="line"><span>    ON COMPANY.ID = DEPARTMENT.EMP_ID;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> emp_id | name  |                        dept</span></span>
<span class="line"><span>--------+-------+----------------------------------------------------</span></span>
<span class="line"><span>      2 | ww    | Engineering</span></span>
<span class="line"><span>      2 | ww    | Engineering</span></span>
<span class="line"><span>        | James |</span></span>
<span class="line"><span>        | James |</span></span>
<span class="line"><span>        | ww    |</span></span>
<span class="line"><span>        | James |</span></span>
<span class="line"><span>        | w     |</span></span>
<span class="line"><span>        | James |</span></span></code></pre></div><h3 id="null-值" tabindex="-1">NULL 值 <a class="header-anchor" href="#null-值" aria-label="Permalink to &quot;NULL 值&quot;">​</a></h3><p>NULL 值代表遗漏的未知数据。表的列可以存放 NULL 值。</p><p>此处说明 IS NULL 和 IS NOT NULL 操作符。</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 建表语法</span></span>
<span class="line"><span># NOT NULL 表示强制字段始终包含值</span></span>
<span class="line"><span>CREATE TABLE COMPANY(</span></span>
<span class="line"><span>   ID INT PRIMARY KEY     NOT NULL,</span></span>
<span class="line"><span>   NAME           TEXT    NOT NULL,</span></span>
<span class="line"><span>   AGE            INT     NOT NULL,</span></span>
<span class="line"><span>   ADDRESS        CHAR(50),</span></span>
<span class="line"><span>   SALARY         REAL</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span># 当前数据</span></span>
<span class="line"><span>select * from company;</span></span>
<span class="line"><span> id | name  | age |         address     | salary </span></span>
<span class="line"><span>----+-------+-----+---------------------+--------</span></span>
<span class="line"><span>  1 | Paul  |  32 | California          |  20000</span></span>
<span class="line"><span>  2 | Allen |  25 | Texas               |  15000</span></span>
<span class="line"><span>  3 | Teddy |  23 | Norway              |  20000</span></span>
<span class="line"><span>  4 | Mark  |  25 | Rich-Mond           |  65000</span></span>
<span class="line"><span>  5 | David |  27 | Texas               |  85000</span></span>
<span class="line"><span>  6 | Kim   |  22 |                     |       </span></span>
<span class="line"><span>  7 | James |  24 |                     |       </span></span>
<span class="line"><span></span></span>
<span class="line"><span># IS NOT NULL 查找不为NULL的字段</span></span>
<span class="line"><span>SELECT  ID, NAME, AGE, ADDRESS, SALARY FROM COMPANY WHERE SALARY IS NOT NULL;</span></span>
<span class="line"><span> id | name  | age | address    | salary</span></span>
<span class="line"><span>----+-------+-----+------------+--------</span></span>
<span class="line"><span>  1 | Paul  |  32 | California |  20000</span></span>
<span class="line"><span>  2 | Allen |  25 | Texas      |  15000</span></span>
<span class="line"><span>  3 | Teddy |  23 | Norway     |  20000</span></span>
<span class="line"><span>  4 | Mark  |  25 | Rich-Mond  |  65000</span></span>
<span class="line"><span>  5 | David |  27 | Texas      |  85000</span></span>
<span class="line"><span># IS NULL： 查找为NULL值的字段</span></span>
<span class="line"><span>SELECT  ID, NAME, AGE, ADDRESS, SALARY FROM COMPANY WHERE SALARY IS NULL;</span></span>
<span class="line"><span>id | name  | age | address | salary</span></span>
<span class="line"><span>----+-------+-----+---------+--------</span></span>
<span class="line"><span>  6 | Kim   |  22 |         |</span></span>
<span class="line"><span>  7 | James |  24 |         |</span></span></code></pre></div><h3 id="别名" tabindex="-1">别名 <a class="header-anchor" href="#别名" aria-label="Permalink to &quot;别名&quot;">​</a></h3><p>重命名一张表或者一个字段的名称；使用AS创建别名</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT C.ID, C.NAME, C.AGE, D.DEPT </span></span>
<span class="line"><span>FROM COMPANY AS C, DEPARTMENT AS D </span></span>
<span class="line"><span>WHERE  C.ID = D.EMP_ID;</span></span>
<span class="line"><span> id | name  | age |  dept</span></span>
<span class="line"><span>----+-------+-----+------------</span></span>
<span class="line"><span>  1 | Paul  |  32 | IT Billing</span></span>
<span class="line"><span>  2 | Allen |  25 | Engineering</span></span>
<span class="line"><span>  7 | James |  24 | Finance</span></span>
<span class="line"><span>  3 | Teddy |  23 | Engineering</span></span>
<span class="line"><span>  4 | Mark  |  25 | Finance</span></span>
<span class="line"><span>  5 | David |  27 | Engineering</span></span>
<span class="line"><span>  6 | Kim   |  22 | Finance</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SELECT C.ID AS COMPANY_ID, C.NAME AS COMPANY_NAME, C.AGE, D.DEPT  </span></span>
<span class="line"><span>FROM COMPANY AS C, DEPARTMENT AS D </span></span>
<span class="line"><span>WHERE  C.ID = D.EMP_ID;</span></span>
<span class="line"><span>company_id | company_name | age | dept</span></span>
<span class="line"><span>------------+--------------+-----+------------</span></span>
<span class="line"><span>      1     | Paul         |  32 | IT Billing</span></span>
<span class="line"><span>      2     | Allen        |  25 | Engineering</span></span>
<span class="line"><span>      7     | James        |  24 | Finance</span></span>
<span class="line"><span>      3     | Teddy        |  23 | Engineering</span></span>
<span class="line"><span>      4     | Mark         |  25 | Finance</span></span>
<span class="line"><span>      5     | David        |  27 | Engineering</span></span>
<span class="line"><span>      6     | Kim          |  22 | Finance</span></span></code></pre></div><h3 id="触发器" tabindex="-1">触发器 <a class="header-anchor" href="#触发器" aria-label="Permalink to &quot;触发器&quot;">​</a></h3><p>触发器是数据库的回调函数，它会在指定的数据库事件发生时自动执行/调用</p><ul><li><p>PostgreSQL 触发器可以在下面几种情况下触发：</p><ul><li>在执行操作之前（在检查约束并尝试插入、更新或删除之前）。</li><li>在执行操作之后（在检查约束并插入、更新或删除完成之后）。</li><li>更新操作（在对一个视图进行插入、更新、删除时）。</li></ul></li><li><p>触发器的 For Each Row 属性是可选的，如果选中，当操作修改时每行调用一次；相反，选中 For Each Statement，不管修改了多少行，每个语句标记的触发器执行一次。</p></li><li><p>WHEN 子句和触发器操作在引用 NEW.column-name 和 OLD.column-name 表单插入、删除或更新时可以访问每一行元素。其中 column-name 是与触发器关联的表中的列的名称。</p></li><li><p>如果存在 WHEN 子句，PostgreSQL 语句只会执行 WHEN 子句成立的那一行，如果没有 WHEN 子句，PostgreSQL 语句会在每一行执行。</p></li><li><p>BEFORE 或 AFTER 关键字决定何时执行触发器动作，决定是在关联行的插入、修改或删除之前或者之后执行触发器动作。</p></li><li><p>要修改的表必须存在于同一数据库中，作为触发器被附加的表或视图，且必须只使用 tablename，而不是 database.tablename。</p></li><li><p>当创建约束触发器时会指定约束选项。这与常规触发器相同，只是可以使用这种约束来调整触发器触发的时间。当约束触发器实现的约束被违反时，它将抛出异常。</p></li></ul><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 1. 假设表已存在</span></span>
<span class="line"><span>CREATE TABLE COMPANY(</span></span>
<span class="line"><span>   ID INT PRIMARY KEY     NOT NULL,</span></span>
<span class="line"><span>   NAME           TEXT    NOT NULL,</span></span>
<span class="line"><span>   AGE            INT     NOT NULL,</span></span>
<span class="line"><span>   ADDRESS        CHAR(50),</span></span>
<span class="line"><span>   SALARY         REAL</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span># 2. 创建一个新表。每当company表有一条新增记录，日志消息将插入其中</span></span>
<span class="line"><span># ID 是 AUDIT 记录的 ID，EMP_ID 是来自 COMPANY 表的 ID，DATE 将保持 COMPANY 中记录被创建时的时间戳</span></span>
<span class="line"><span>CREATE TABLE AUDIT(</span></span>
<span class="line"><span>   EMP_ID INT NOT NULL,</span></span>
<span class="line"><span>   ENTRY_DATE TEXT NOT NULL</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span># 3. 创建触发器</span></span>
<span class="line"><span># 3.1 先创建函数</span></span>
<span class="line"><span>CREATE OR REPLACE FUNCTION auditlogfunc() RETURNS TRIGGER AS $example_table$</span></span>
<span class="line"><span>   BEGIN</span></span>
<span class="line"><span>      INSERT INTO AUDIT(EMP_ID, ENTRY_DATE) VALUES (new.ID, current_timestamp);</span></span>
<span class="line"><span>      RETURN NEW;</span></span>
<span class="line"><span>   END;</span></span>
<span class="line"><span>$example_table$ LANGUAGE plpgsql;</span></span>
<span class="line"><span># 3.2 创建触发器</span></span>
<span class="line"><span>CREATE TRIGGER example_trigger </span></span>
<span class="line"><span>AFTER INSERT ON COMPANY </span></span>
<span class="line"><span>FOR EACH ROW EXECUTE PROCEDURE auditlogfunc();</span></span>
<span class="line"><span># 4. 新增company一条数据</span></span>
<span class="line"><span>INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) VALUES (16, &#39;Paul&#39;, 32, &#39;California&#39;, 20000.00 );</span></span>
<span class="line"><span># 5. 查询audit数据</span></span>
<span class="line"><span>select * from audit;</span></span>
<span class="line"><span> emp_id |          entry_date</span></span>
<span class="line"><span>--------+-------------------------------</span></span>
<span class="line"><span>     16 | 2025-10-25 12:53:21.627736+00</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 列出触发器</span></span>
<span class="line"><span>SELECT * FROM pg_trigger;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  oid  | tgrelid | tgparentid |     tgname      | tgfoid | tgtype | tgenabled | tgisinternal | tgconstrrelid | tgconstrindid | tgconstraint | tgdeferrable | tginitdeferred | tgnargs | tgattr | tgargs | tgqual | tgoldtable | tgnewtable</span></span>
<span class="line"><span>-------+---------+------------+-----------------+--------+--------+-----------+--------------+---------------+---------------+--------------+--------------+----------------+---------+--------+--------+--------+------------+------------</span></span>
<span class="line"><span> 26926 |   26894 |          0 | example_trigger |  26925 |      5 | O         | f            |             0 |             0 |            0 | f            | f              |       0 |        | \\x     |        |            |</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 删除触发器</span></span>
<span class="line"><span># 语法</span></span>
<span class="line"><span>drop trigger \${trigger_name} on \${table_of_trigger_dependent};</span></span>
<span class="line"><span>drop trigger example_trigger on company;</span></span></code></pre></div><h3 id="索引" tabindex="-1">索引 <a class="header-anchor" href="#索引" aria-label="Permalink to &quot;索引&quot;">​</a></h3><p>索引有助于加快 SELECT 查询和 WHERE 子句，但它会减慢使用 UPDATE 和 INSERT 语句时的数据输入。索引可以创建或删除，但不会影响数据。</p><p>使用 CREATE INDEX 语句创建索引，它允许命名索引，指定表及要索引的一列或多列，并指示索引是升序排列还是降序排列。</p><p>索引也可以是唯一的，与 UNIQUE 约束类似，在列上或列组合上防止重复条目。</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE INDEX index_name ON table_name;</span></span></code></pre></div><h5 id="索引类型" tabindex="-1">索引类型 <a class="header-anchor" href="#索引类型" aria-label="Permalink to &quot;索引类型&quot;">​</a></h5><ul><li><p>单列索引</p><p>一个只基于表的一个列上创建的索引</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE INDEX index_name</span></span>
<span class="line"><span>ON table_name (column_name);</span></span></code></pre></div></li><li><p>组合索引</p><p>基于表的多列上创建的索引</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE INDEX index_name</span></span>
<span class="line"><span>ON table_name (column1_name, column2_name);</span></span></code></pre></div></li><li><p>唯一索引</p><p>唯一索引不允许任何重复的值插入到表中</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE UNIQUE INDEX index_name</span></span>
<span class="line"><span>on table_name (column_name);</span></span></code></pre></div></li><li><p>局部索引</p><p>在表的子集上构建的索引；子集由一个条件表达式上定义。索引只包含满足条件的行</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE INDEX index_name</span></span>
<span class="line"><span>on table_name (conditional_expression);</span></span></code></pre></div></li><li><p>隐式索引</p><p>在创建对象时，由数据库服务器自动创建的索引。索引自动创建为主键约束和唯一约束</p></li></ul><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 默认表结构</span></span>
<span class="line"><span>learn=# \\d company</span></span>
<span class="line"><span>                   Table &quot;public.company&quot;</span></span>
<span class="line"><span>  Column   |     Type      | Collation | Nullable | Default</span></span>
<span class="line"><span>-----------+---------------+-----------+----------+---------</span></span>
<span class="line"><span> id        | integer       |           | not null |</span></span>
<span class="line"><span> name      | text          |           | not null |</span></span>
<span class="line"><span> age       | integer       |           | not null |</span></span>
<span class="line"><span> address   | character(50) |           |          |</span></span>
<span class="line"><span> salary    | real          |           |          |</span></span>
<span class="line"><span> join_date | date          |           |          |</span></span>
<span class="line"><span>Indexes:</span></span>
<span class="line"><span>    &quot;company_pkey&quot; PRIMARY KEY, btree (id)</span></span>
<span class="line"><span>Triggers:</span></span>
<span class="line"><span>    example_trigger AFTER INSERT ON company FOR EACH ROW EXECUTE FUNCTION auditlogfunc()</span></span>
<span class="line"><span># 1. 增加索引</span></span>
<span class="line"><span>CREATE INDEX salary_index ON COMPANY (salary);</span></span>
<span class="line"><span># 增加Indexes</span></span>
<span class="line"><span>Indexes:</span></span>
<span class="line"><span>    &quot;company_pkey&quot; PRIMARY KEY, btree (id)</span></span>
<span class="line"><span>    &quot;salary_index&quot; btree (salary)</span></span>
<span class="line"><span># 2. 删除索引</span></span>
<span class="line"><span>DROP INDEX salary_index;</span></span></code></pre></div><h5 id="什么情况下要避免使用索引" tabindex="-1">什么情况下要避免使用索引？ <a class="header-anchor" href="#什么情况下要避免使用索引" aria-label="Permalink to &quot;什么情况下要避免使用索引？&quot;">​</a></h5><p>虽然索引的目的在于提高数据库的性能，但这里有几个情况需要避免使用索引。</p><p>使用索引时，需要考虑下列准则：</p><ul><li>索引不应该使用在较小的表上。</li><li>索引不应该使用在有频繁的大批量的更新或插入操作的表上。</li><li>索引不应该使用在含有大量的 NULL 值的列上。</li><li>索引不应该使用在频繁操作的列上。</li></ul><h3 id="alter-table-命令" tabindex="-1">ALTER TABLE 命令 <a class="header-anchor" href="#alter-table-命令" aria-label="Permalink to &quot;ALTER TABLE 命令&quot;">​</a></h3><p><strong>ALTER TABLE</strong> 命令用于添加，修改，删除一张已经存在表的列</p><p>也可以用 <strong>ALTER TABLE</strong> 命令添加和删除约束</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 1. 添加新列</span></span>
<span class="line"><span>ALTER TABLE COMPANY ADD GENDER char(1);</span></span>
<span class="line"><span># 2. 删除列</span></span>
<span class="line"><span>ALTER TABLE COMPANY DROP GENDER;</span></span></code></pre></div><p>类似还有修改数据类型、添加或修改约束、索引、主键</p><h3 id="transaction事务" tabindex="-1">Transaction事务 <a class="header-anchor" href="#transaction事务" aria-label="Permalink to &quot;Transaction事务&quot;">​</a></h3><p>事务是数据库管理系统执行过程中的一个逻辑单位，由一个有限的数据库操作序列构成</p><p>数据库事务通常包含了一个序列的对数据库的读/写操作。包含有以下两个目的：</p><ul><li>为数据库操作序列提供了一个从失败中恢复到正常状态的方法，同时提供了数据库即使在异常状态下仍能保持一致性的方法。</li><li>当多个应用程序在并发访问数据库时，可以在这些应用程序之间提供一个隔离方法，以防止彼此的操作互相干扰。</li></ul><p>当事务被提交给了数据库管理系统(DBMS)，则 DBMS 需要确保该事务中的所有操作都成功完成且其结果被永久保存在数据库中，如果事务中有的操作没有成功完成，则事务中的所有操作都需要回滚，回到事务执行前的状态；同时，该事务对数据库或者其他事务的执行无影响，所有的事务都好像在独立的运行。</p><h5 id="事务的属性" tabindex="-1">事务的属性 <a class="header-anchor" href="#事务的属性" aria-label="Permalink to &quot;事务的属性&quot;">​</a></h5><p>事务具有以下四个标准属性，通常根据首字母缩写为 ACID：</p><ul><li>原子性(Atomicity)：事务作为一个整体被执行，包含在其中的对数据库的操作要么全部被执行，要么都不执行。</li><li>一致性(Consistency)：事务应确保数据库的状态从一个一致状态转变为另一个一致状态。一致状态的含义是数据库中的数据应满足完整性约束。</li><li>隔离性(Isolation)：多个事务并发执行时，一个事务的执行不应影响其他事务的执行。</li><li>持久性(Durability)：已被提交的事务对数据库的修改应该永久保存在数据库中。</li></ul><h5 id="实例" tabindex="-1">实例 <a class="header-anchor" href="#实例" aria-label="Permalink to &quot;实例&quot;">​</a></h5><p>某人要在商店使用电子货币购买100元的东西，当中至少包括两个操作：</p><ul><li>该人账户减少 100 元。</li><li>商店账户增加100元。</li></ul><p>支持事务的数据库管理系统就是要确保以上两个操作（整个&quot;事务&quot;）都能完成，或一起取消，否则就会出现 100 元平白消失或出现的情况。</p><h5 id="事务控制" tabindex="-1">事务控制 <a class="header-anchor" href="#事务控制" aria-label="Permalink to &quot;事务控制&quot;">​</a></h5><p>使用下面的命令来控制事务：</p><ul><li>​<strong>BEGIN TRANSACTION</strong>：开始一个事务。</li><li>​<strong>COMMIT</strong>：事务确认，或者可以使用 END TRANSACTION 命令。</li><li>​<strong>ROLLBACK</strong>：事务回滚。</li></ul><p>事务控制命令只与 INSERT、UPDATE 和 DELETE 一起使用。他们不能在创建表或删除表时使用，因为这些操作在数据库中是自动提交的。</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>BEGIN;或者BEGIN TRANSACTION;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>COMMIT;或者END TRANSACTION;或ROLLBACK;</span></span></code></pre></div><h3 id="视图" tabindex="-1">视图 <a class="header-anchor" href="#视图" aria-label="Permalink to &quot;视图&quot;">​</a></h3><p>View（视图）是一张假表，只不过是通过相关的名称存储在数据库中的一个 PostgreSQL 语句。</p><p>View（视图）实际上是一个以预定义的 PostgreSQL 查询形式存在的表的组合。</p><p>View（视图）可以包含一个表的所有行或从一个或多个表选定行。</p><p>View（视图）可以从一个或多个表创建，这取决于要创建视图的 PostgreSQL 查询。</p><p>View（视图）是一种虚拟表，允许用户实现以下几点：</p><ul><li>用户或用户组认为更自然或直观查找结构数据的方式。</li><li>限制数据访问，用户只能看到有限的数据，而不是完整的表。</li><li>汇总各种表中的数据，用于生成报告。</li></ul><p>PostgreSQL 视图是只读的，因此可能无法在视图上执行 DELETE、INSERT 或 UPDATE 语句。但是可以在视图上创建一个触发器，当尝试 DELETE、INSERT 或 UPDATE 视图时触发，需要做的动作在触发器内容中定义。</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 1. 创建视图</span></span>
<span class="line"><span>CREATE VIEW COMPANY_VIEW AS</span></span>
<span class="line"><span>SELECT ID, NAME, AGE</span></span>
<span class="line"><span>FROM  COMPANY;</span></span>
<span class="line"><span># 2. 查询视图</span></span>
<span class="line"><span>SELECT * FROM COMPANY_VIEW;</span></span>
<span class="line"><span># 3. 删除视图</span></span>
<span class="line"><span>DROP VIEW COMPANY_VIEW;</span></span></code></pre></div><h3 id="lock" tabindex="-1">Lock <a class="header-anchor" href="#lock" aria-label="Permalink to &quot;Lock&quot;">​</a></h3><p>锁主要是为了保持数据库数据的一致性，可以阻止用户修改一行或整个表，一般用在并发较高的数据库中。</p><p>在多个用户访问数据库的时候若对并发操作不加控制就可能会读取和存储不正确的数据，破坏数据库的一致性。</p><p>数据库中有两种基本的锁：排它锁（Exclusive Locks）和共享锁（Share Locks）。</p><p>如果数据对象加上排它锁，则其他的事务不能对它读取和修改。</p><p>如果加上共享锁，则该数据库对象可以被其他事务读取，但不能修改。</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># LOCK 语句只在事务模式下工作。</span></span>
<span class="line"><span>BEGIN;</span></span>
<span class="line"><span>LOCK TABLE company1 IN ACCESS EXCLUSIVE MODE;</span></span></code></pre></div><h5 id="死锁" tabindex="-1">死锁 <a class="header-anchor" href="#死锁" aria-label="Permalink to &quot;死锁&quot;">​</a></h5><p>当两个事务彼此等待对方完成其操作时，可能会发生死锁。尽管 PostgreSQL 可以检测它们并以回滚结束它们，但死锁仍然很不方便。为了防止应用程序遇到这个问题，请确保将应用程序设计为以相同的顺序锁定对象。</p><h5 id="咨询锁" tabindex="-1">咨询锁 <a class="header-anchor" href="#咨询锁" aria-label="Permalink to &quot;咨询锁&quot;">​</a></h5><p>PostgreSQL 提供了创建具有应用程序定义含义的锁的方法。这些被称为咨询锁。由于系统不强制使用它们，所以正确使用它们取决于应用程序。咨询锁对于不适合 MVCC 模型的锁定策略非常有用。</p><p>例如，咨询锁的一个常见用途是模拟所谓&quot;平面文件&quot;数据管理系统中典型的悲观锁定策略。虽然存储在表中的标志可以用于相同的目的，但是通知锁更快，避免了表膨胀，并且在会话结束时由服务器自动清理。</p><h3 id="子查询" tabindex="-1">子查询 <a class="header-anchor" href="#子查询" aria-label="Permalink to &quot;子查询&quot;">​</a></h3><p>子查询或称为内部查询、嵌套查询，指的是在 PostgreSQL 查询中的 WHERE 子句中嵌入查询语句。</p><p>一个 SELECT 语句的查询结果能够作为另一个语句的输入值。</p><p>子查询可以与 SELECT、INSERT、UPDATE 和 DELETE 语句一起使用，并可使用运算符如 =、&lt;、&gt;、&gt;=、&lt;=、IN、BETWEEN 等。</p><p>以下是子查询必须遵循的几个规则：</p><ul><li>子查询必须用括号括起来。</li><li>子查询在 SELECT 子句中只能有一个列，除非在主查询中有多列，与子查询的所选列进行比较。</li><li>ORDER BY 不能用在子查询中，虽然主查询可以使用 ORDER BY。可以在子查询中使用 GROUP BY，功能与 ORDER BY 相同。</li><li>子查询返回多于一行，只能与多值运算符一起使用，如 IN 运算符。</li><li>BETWEEN 运算符不能与子查询一起使用，但是，BETWEEN 可在子查询内使用。</li></ul><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># SELECT 语句中使用子查询</span></span>
<span class="line"><span>SELECT * FROM COMPANY </span></span>
<span class="line"><span>WHERE ID IN (SELECT ID FROM COMPANY  WHERE SALARY &gt; 45000) ;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 子查询也可以与 INSERT 语句一起使用。INSERT 语句使用子查询返回的数据插入到另一个表中</span></span>
<span class="line"><span>INSERT INTO COMPANY_BKP SELECT * FROM COMPANY  </span></span>
<span class="line"><span>WHERE ID IN (SELECT ID FROM COMPANY) ;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 子查询可以与 UPDATE 语句结合使用。当通过 UPDATE 语句使用子查询时，表中单个或多个列被更新</span></span>
<span class="line"><span>UPDATE COMPANY SET SALARY = SALARY * 0.50 </span></span>
<span class="line"><span>WHERE AGE IN (SELECT AGE FROM COMPANY_BKP WHERE AGE &gt;= 27 );</span></span></code></pre></div><h3 id="auto-increment-自动增长" tabindex="-1">Auto Increment（自动增长） <a class="header-anchor" href="#auto-increment-自动增长" aria-label="Permalink to &quot;Auto Increment（自动增长）&quot;">​</a></h3><p>自动增长会在新记录插入表中时生成一个唯一的数字</p><p>PostgreSQL 使用序列来标识字段的自增长，数据类型有 smallserial、serial 和 bigserial 。这些属性类似于 MySQL 数据库支持的 AUTO_INCREMENT 属性</p><p>SMALLSERIAL、SERIAL 和 BIGSERIAL 范围：</p><table tabindex="0"><thead><tr><th>伪类型</th><th>存储大小</th><th>范围</th></tr></thead><tbody><tr><td>SMALLSERIAL</td><td>2字节</td><td>1 到 32,767</td></tr><tr><td>SERIAL</td><td>4字节</td><td>1 到 2,147,483,647</td></tr><tr><td>BIGSERIAL</td><td>8字节</td><td>1 到 922,337,2036,854,775,807</td></tr></tbody></table><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE TABLE nhooo</span></span>
<span class="line"><span>(</span></span>
<span class="line"><span>    id serial NOT NULL,</span></span>
<span class="line"><span>    alttext text,</span></span>
<span class="line"><span>    imgurl text</span></span>
<span class="line"><span>)</span></span></code></pre></div><h3 id="privileges-权限" tabindex="-1">Privileges(权限) <a class="header-anchor" href="#privileges-权限" aria-label="Permalink to &quot;Privileges(权限)&quot;">​</a></h3><p>无论何时创建数据库对象，都会为其分配一个所有者，所有者通常是执行 create 语句的人。</p><p>对于大多数类型的对象，初始状态是只有所有者(或超级用户)才能修改或删除对象。要允许其他角色或用户使用它，必须为该用户设置权限。</p><p>在 PostgreSQL 中，权限分为以下几种：</p><ul><li>SELECT</li><li>INSERT</li><li>UPDATE</li><li>DELETE</li><li>TRUNCATE</li><li>REFERENCES</li><li>TRIGGER</li><li>CREATE</li><li>CONNECT</li><li>TEMPORARY</li><li>EXECUTE</li><li>USAGE</li></ul><p>基础语法</p><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GRANT privilege [, ...]</span></span>
<span class="line"><span>ON object [, ...]</span></span>
<span class="line"><span>TO { PUBLIC | GROUP group | username }</span></span></code></pre></div><ul><li>privilege − 值可以为：SELECT，INSERT，UPDATE，DELETE， RULE，ALL。</li><li>object − 要授予访问权限的对象名称。可能的对象有： table， view，sequence。</li><li>PUBLIC − 表示所有用户。</li><li>GROUP group − 为用户组授予权限。</li><li>username − 要授予权限的用户名。PUBLIC 是代表所有用户的简短形式。</li></ul><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 分配权限</span></span>
<span class="line"><span>GRANT ALL ON COMPANY TO nhooo;</span></span>
<span class="line"><span># 撤销分配权限</span></span>
<span class="line"><span>REVOKE ALL ON COMPANY FROM nhooo;</span></span></code></pre></div><h3 id="时间-日期函数和操作" tabindex="-1">时间/日期函数和操作 <a class="header-anchor" href="#时间-日期函数和操作" aria-label="Permalink to &quot;时间/日期函数和操作&quot;">​</a></h3><h5 id="一、常用日期-时间操作符-重点场景" tabindex="-1">一、常用日期 / 时间操作符（重点场景） <a class="header-anchor" href="#一、常用日期-时间操作符-重点场景" aria-label="Permalink to &quot;一、常用日期 / 时间操作符（重点场景）&quot;">​</a></h5><p>操作符的核心作用是 ​ <strong>“对日期 / 时间做加减运算”</strong> ​，不同类型的组合（如 <code>date + 整数</code>​、<code>timestamp + interval</code>）对应不同业务含义，以下是最常用的几种：</p><table tabindex="0"><thead><tr><th>操作符组合</th><th>核心用途</th><th>实例</th><th>结果（业务含义）</th></tr></thead><tbody><tr><td>​<code>date + 整数</code></td><td>日期加 N 天</td><td>​<code>&#39;2024-05-20&#39;::date + 3</code></td><td>​<code>2024-05-23</code>（3 天后的日期）</td></tr><tr><td>​<code>date - 整数</code></td><td>日期减 N 天</td><td>​<code>&#39;2024-05-20&#39;::date - 2</code></td><td>​<code>2024-05-18</code>（2 天前的日期）</td></tr><tr><td>​<code>timestamp + interval</code></td><td>时间戳加 N 时间（时 / 分 / 秒）</td><td>​<code>&#39;2024-05-20 10:30&#39;::timestamp + interval &#39;1.5 hours&#39;</code></td><td>​<code>2024-05-20 12:00</code>（加 1.5 小时）</td></tr><tr><td>​<code>timestamp - interval</code></td><td>时间戳减 N 时间</td><td>​<code>&#39;2024-05-20 10:30&#39;::timestamp - interval &#39;30 mins&#39;</code></td><td>​<code>2024-05-20 10:00</code>（减 30 分钟）</td></tr><tr><td>​<code>date1 - date2</code></td><td>两个日期差（天数）</td><td>​<code>&#39;2024-05-20&#39;::date - &#39;2024-05-15&#39;::date</code></td><td>​<code>5</code>（两个日期间隔 5 天）</td></tr><tr><td>​<code>timestamp1 - timestamp2</code></td><td>两个时间戳差（时间间隔）</td><td>​<code>&#39;2024-05-20 10:30&#39;::timestamp - &#39;2024-05-19 18:00&#39;::timestamp</code></td><td>​<code>16:30:00</code>（间隔 16 小时 30 分钟）</td></tr></tbody></table><h5 id="二、高频日期-时间函数-按用途分类" tabindex="-1">二、高频日期 / 时间函数（按用途分类） <a class="header-anchor" href="#二、高频日期-时间函数-按用途分类" aria-label="Permalink to &quot;二、高频日期 / 时间函数（按用途分类）&quot;">​</a></h5><p>函数比操作符更灵活，能解决「提取时间片段、截断时间、构造时间、计算差值」等复杂需求，以下是开发中最常用的函数：</p><ol><li>获取 “当前时间” 相关函数（日志 / 创建时间常用）</li></ol><p>这类函数用于获取数据库当前的时间，核心区别在于 ​ <strong>“是否随事务 / 语句执行变化”</strong> ，需根据场景选择：</p><table tabindex="0"><thead><tr><th>函数</th><th>返回类型</th><th>核心特点</th><th>适用场景</th></tr></thead><tbody><tr><td>​<code>current_date</code></td><td>​<code>date</code></td><td>仅返回当前日期（无时间）</td><td>记录 “当天日期”（如订单日期）</td></tr><tr><td>​<code>current_timestamp</code></td><td>​<code>timestamp with time zone</code></td><td>事务开始时的时间（事务内不变）</td><td>事务内统一时间（如订单创建时间）</td></tr><tr><td>​<code>now()</code></td><td>​<code>timestamp with time zone</code></td><td>等同于 <code>current_timestamp</code></td><td>同上，更简洁常用</td></tr><tr><td>​<code>clock_timestamp()</code></td><td>​<code>timestamp with time zone</code></td><td>实时时间（语句执行中会变化）</td><td>记录 “精确耗时”（如日志打印时间）</td></tr><tr><td>​<code>localtime</code></td><td>​<code>time</code></td><td>仅返回当前时间（无日期，本地时区）</td><td>记录 “当天具体时间”（如打卡时间）</td></tr></tbody></table><ol start="2"><li>提取时间片段（统计 / 筛选常用）</li></ol><p>从日期 / 时间中提取 “年、月、日、时、分、秒” 等片段，常用 <code>extract</code>​ 或 <code>date_part</code>​（两者功能完全一致，<code>extract</code> 更直观）。</p><table tabindex="0"><thead><tr><th>函数语法</th><th>提取内容</th><th>实例</th><th>结果</th></tr></thead><tbody><tr><td>​<code>extract(字段 from 时间)</code></td><td>年 / 月 / 日 / 时等</td><td>​<code>extract(year from &#39;2024-05-20&#39;::date)</code></td><td>2024</td></tr><tr><td>​<code>extract(字段 from 时间)</code></td><td>月份</td><td>​<code>extract(month from &#39;2024-05-20&#39;::date)</code></td><td>5</td></tr><tr><td>​<code>extract(字段 from 时间)</code></td><td>小时</td><td>​<code>extract(hour from &#39;2024-05-20 10:30&#39;::timestamp)</code></td><td>10</td></tr><tr><td>​<code>date_part(&#39;字段&#39;, 时间)</code></td><td>天数</td><td>​<code>date_part(&#39;day&#39;, &#39;2024-05-20&#39;::date)</code></td><td>20</td></tr></tbody></table><ol start="3"><li>时间截断（分组统计常用）</li></ol><p>​<code>date_trunc</code>​ 函数将时间 “截断” 到指定精度（如按天、按小时、按月），返回截断后的时间戳，是<strong>按时间分组统计</strong>的核心工具。</p><table tabindex="0"><thead><tr><th>函数语法</th><th>截断精度</th><th>实例</th><th>结果（截断后）</th></tr></thead><tbody><tr><td>​<code>date_trunc(&#39;精度&#39;, 时间)</code></td><td>天（day）</td><td>​<code>date_trunc(&#39;day&#39;, &#39;2024-05-20 10:30&#39;::timestamp)</code></td><td>​<code>2024-05-20 00:00:00</code></td></tr><tr><td>​<code>date_trunc(&#39;精度&#39;, 时间)</code></td><td>小时（hour）</td><td>​<code>date_trunc(&#39;hour&#39;, &#39;2024-05-20 10:30&#39;::timestamp)</code></td><td>​<code>2024-05-20 10:00:00</code></td></tr><tr><td>​<code>date_trunc(&#39;精度&#39;, 时间)</code></td><td>月（month）</td><td>​<code>date_trunc(&#39;month&#39;, &#39;2024-05-20 10:30&#39;::timestamp)</code></td><td>​<code>2024-05-01 00:00:00</code></td></tr></tbody></table><ol start="4"><li>计算时间差值（工龄 / 有效期常用）</li></ol><p>​<code>age</code> 函数用于计算两个时间的差值，返回 “年、月、日” 的符号化结果（比直接相减更直观，适合人类可读的场景）。</p><table tabindex="0"><thead><tr><th>函数语法</th><th>用途</th><th>实例</th><th>结果（直观差值）</th></tr></thead><tbody><tr><td>​<code>age(结束时间, 开始时间)</code></td><td>计算两个时间差</td><td>​<code>age(&#39;2024-05-20&#39;::date, &#39;2020-03-15&#39;::date)</code></td><td>​<code>4 years 2 mons 5 days</code>（4 年 2 个月 5 天）</td></tr><tr><td>​<code>age(时间)</code></td><td>计算当前时间与该时间差</td><td>​<code>age(&#39;2020-03-15&#39;::date)</code></td><td></td></tr></tbody></table><ol start="5"><li>构造日期 / 时间（动态生成常用）</li></ol><p>当需要 “手动生成” 日期 / 时间时，用 <code>make_date</code>​、<code>make_time</code>​、<code>make_interval</code> 等函数，比直接写字符串更灵活（尤其动态参数场景）。</p><table tabindex="0"><thead><tr><th>函数语法</th><th>用途</th><th>实例</th><th>结果</th></tr></thead><tbody><tr><td>​<code>make_date(年, 月, 日)</code></td><td>构造日期</td><td>​<code>make_date(2024, 5, 20)</code></td><td>​<code>2024-05-20</code></td></tr><tr><td>​<code>make_time(时, 分, 秒)</code></td><td>构造时间</td><td>​<code>make_time(14, 30, 45)</code></td><td>​<code>14:30:45</code></td></tr><tr><td>​<code>make_interval(天数/小时等)</code></td><td>构造时间间隔</td><td>​<code>make_interval(days := 7, hours := 3)</code></td><td></td></tr></tbody></table><h5 id="三、典型业务场景总结" tabindex="-1">三、典型业务场景总结 <a class="header-anchor" href="#三、典型业务场景总结" aria-label="Permalink to &quot;三、典型业务场景总结&quot;">​</a></h5><p>将上述工具结合，解决实际开发中的常见问题：</p><table tabindex="0"><thead><tr><th>业务需求</th><th>解决方案（SQL 片段）</th></tr></thead><tbody><tr><td>1. 查询近 7 天的订单</td><td>​<code>WHERE create_time &gt;= current_date - 7</code></td></tr><tr><td>2. 统计每个小时的订单量（今天）</td><td>​<code>GROUP BY date_trunc(&#39;hour&#39;, create_time) WHERE create_time &gt;= current_date</code></td></tr><tr><td>3. 计算订单的处理耗时（接单到完成）</td><td>​<code>SELECT order_no, age(finish_time, accept_time) AS handle_time FROM orders</code></td></tr><tr><td>4. 提取员工入职年份，按年份分组</td><td>​<code>GROUP BY extract(year from hire_date) SELECT extract(year from hire_date) AS hire_year</code></td></tr><tr><td>5. 生成未来 30 天的日期列表</td><td>​<code>SELECT current_date + generate_series(0,29) AS future_date</code>​（结合 generate_series 函数）</td></tr></tbody></table><h3 id="常用函数" tabindex="-1">常用函数 <a class="header-anchor" href="#常用函数" aria-label="Permalink to &quot;常用函数&quot;">​</a></h3><h5 id="一、聚合函数-统计分析核心" tabindex="-1">一、聚合函数（统计分析核心） <a class="header-anchor" href="#一、聚合函数-统计分析核心" aria-label="Permalink to &quot;一、聚合函数（统计分析核心）&quot;">​</a></h5><p>聚合函数用于对一组数据进行计算并返回单个结果，是报表统计、数据汇总的基础，常和 <code>GROUP BY</code> 搭配使用。</p>`,155),a("table",{tabindex:"0"},[a("thead",null,[a("tr",null,[a("th",null,"函数"),a("th",null,"核心用途"),a("th",null,[s("示例（基于 "),a("code",null,"COMPANY"),s(" 表）")]),a("th",null,"结果（示例）")])]),a("tbody",null,[a("tr",null,[a("td",null,[s("​"),a("code",null,"COUNT()")]),a("td",null,"统计行数（非 NULL 值）"),a("td",null,[s("1. 统计所有员工数："),a("br"),a("code",null,"SELECT COUNT(*) FROM COMPANY;"),a("br"),s("2. 统计有地址的员工数（排除 NULL）："),a("br"),a("code",null,"SELECT COUNT(address) FROM COMPANY;")]),a("td",null,[s("1. 7（总员工数）"),a("br"),s("2. 7（无 NULL 时）")])]),a("tr",null,[a("td",null,[s("​"),a("code",null,"MAX()")]),a("td",null,"取某列最大值"),a("td",null,[s("查最高工资："),a("br"),a("code",null,"SELECT MAX(salary) AS max_salary FROM COMPANY;")]),a("td",null,"85000（David 的工资）")]),a("tr",null,[a("td",null,[s("​"),a("code",null,"MIN()")]),a("td",null,"取某列最小值"),a("td",null,[s("查最小年龄："),a("br"),a("code",null,"SELECT MIN(age) AS min_age FROM COMPANY;")]),a("td",null,"22（Kim 的年龄）")]),a("tr",null,[a("td",null,[s("​"),a("code",null,"AVG()")]),a("td",null,"计算某列平均值（数值型）"),a("td",null,[s("算平均工资（自动忽略 NULL）："),a("br"),a("code",null,"SELECT AVG(salary) AS avg_salary FROM COMPANY;")]),a("td",null,"约 37142.86")]),a("tr",null,[a("td",null,[s("​"),a("code",null,"SUM()")]),a("td",null,"计算某列总和（数值型）"),a("td",null,[s("算所有员工工资总和："),a("br"),a("code",null,"SELECT SUM(salary) AS total_salary FROM COMPANY;")]),a("td",null,"260000")]),a("tr",null,[a("td",null,[s("​"),a("code",null,"ARRAY_AGG()")]),a("td",null,"将分组结果转为数组"),a("td",null,[s("按年龄分组，汇总同年龄的员工姓名："),a("br"),a("code",null,"SELECT age, ARRAY_AGG(name) AS emp_names FROM COMPANY GROUP BY age;")]),a("td",{"Allen,Mark":""},"25 →")])])],-1),e('<h5 id="二、数学函数-数值计算常用" tabindex="-1">二、数学函数（数值计算常用） <a class="header-anchor" href="#二、数学函数-数值计算常用" aria-label="Permalink to &quot;二、数学函数（数值计算常用）&quot;">​</a></h5><p>数学函数用于处理数值型数据，重点关注 “取整、绝对值、随机数、数值调整” 等高频需求，三角函数（如 sin、cos）仅在特定场景（如几何计算）使用，此处暂不展开。</p><table tabindex="0"><thead><tr><th>函数</th><th>核心用途</th><th>示例（基于 <code>COMPANY</code> 表）</th><th>结果（示例）</th></tr></thead><tbody><tr><td>​<code>abs(x)</code></td><td>取绝对值</td><td>计算工资与平均工资的差值绝对值：<br><code>SELECT name, abs(salary - (SELECT AVG(salary) FROM COMPANY)) AS sal_diff FROM COMPANY;</code></td><td>Allen → 22142.86</td></tr><tr><td>​<code>round(x[, s])</code></td><td>四舍五入（s 为小数位数）</td><td>1. 工资四舍五入到整数：<br><code>SELECT round(salary) FROM COMPANY;</code><br>2. 平均工资保留 2 位小数：<br><code>SELECT round(AVG(salary), 2) FROM COMPANY;</code></td><td>1. 15000（Allen）<br>2. 37142.86</td></tr><tr><td>​<code>ceil(x)</code></td><td>向上取整（不小于 x 的整数）</td><td>工资向上取整到千位（如 15200 → 16000）：<br><code>SELECT ceil(salary/1000)*1000 FROM COMPANY;</code></td><td>Allen → 16000</td></tr><tr><td>​<code>floor(x)</code></td><td>向下取整（不大于 x 的整数）</td><td>工资向下取整到千位：<br><code>SELECT floor(salary/1000)*1000 FROM COMPANY;</code></td><td>Allen → 15000</td></tr><tr><td>​<code>trunc(x[, s])</code></td><td>截断（向零取整，不四舍五入）</td><td>工资截断到千位（15800 → 15000）：<br><code>SELECT trunc(salary/1000)*1000 FROM COMPANY;</code></td><td>Allen → 15000</td></tr><tr><td>​<code>mod(y, x)</code></td><td>取余数（y 除以 x 的余数）</td><td>判断员工 ID 奇偶（余数 0 为偶，1 为奇）：<br><code>SELECT id, name, mod(id, 2) AS is_odd FROM COMPANY;</code></td><td>id=1 → 1（奇）<br>id=2 → 0（偶）</td></tr><tr><td>​<code>random()</code></td><td>生成 0~1 之间的随机数</td><td>给员工生成随机绩效分（0~100）：<br><code>SELECT name, round(random()*100) AS score FROM COMPANY;</code></td><td></td></tr></tbody></table><h5 id="三、字符串函数-文本处理高频" tabindex="-1">三、字符串函数（文本处理高频） <a class="header-anchor" href="#三、字符串函数-文本处理高频" aria-label="Permalink to &quot;三、字符串函数（文本处理高频）&quot;">​</a></h5><p>字符串函数用于清洗、转换、提取文本数据，是处理用户输入（如姓名、地址）、生成格式统一数据的核心，重点关注 “拼接、截取、替换、大小写、去空格”。</p><table tabindex="0"><thead><tr><th>函数</th><th>核心用途</th><th>示例（基于 <code>COMPANY</code>​/<code>DEPARTMENT</code> 表）</th><th>结果（示例）</th><th></th><th></th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td>`</td><td></td><td>`（连接符）</td><td>字符串拼接</td><td>拼接员工姓名和部门：<br>`SELECT c.name</td><td></td><td>&#39; - &#39;</td><td></td><td>d.dept AS emp_dept FROM COMPANY c JOIN DEPARTMENT d ON c.id = d.emp_id;`</td><td>Allen - Engineering</td></tr><tr><td>​<code>lower(x)/upper(x)</code></td><td>转小写 / 大写</td><td>1. 姓名统一转小写：<br><code>SELECT lower(name) FROM COMPANY;</code><br>2. 部门统一转大写：<br><code>SELECT upper(dept) FROM DEPARTMENT;</code></td><td>1. allen<br>2. ENGINEERING</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>​<code>trim(x[, chars])</code></td><td>去除前后指定字符（默认空格）</td><td>清洗地址中的多余空格（如 <code>&#39; Texas &#39;</code>​ → <code>&#39;Texas&#39;</code>）：<br><code>UPDATE COMPANY SET address = trim(address);</code></td><td>Texas（去空格后）</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>​<code>substring(x from a [for n])</code></td><td>截取子串（a 起始位置，n 长度）</td><td>1. 截取姓名前 2 个字符：<br><code>SELECT substring(name from 1 for 2) FROM COMPANY;</code><br>2. 截取地址从第 3 个字符开始：<br><code>SELECT substring(address from 3) FROM COMPANY;</code></td><td>1. Pa（Paul）<br>2. xas（Texas）</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>​<code>replace(x, old, new)</code></td><td>替换子串</td><td>将地址中的 <code>&#39;California&#39;</code>​ 简写为 <code>&#39;CA&#39;</code>：<br><code>UPDATE COMPANY SET address = replace(address, &#39;California&#39;, &#39;CA&#39;);</code></td><td>CA（原 California）</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>​<code>split_part(x, delimiter, n)</code></td><td>按分隔符拆分，取第 n 部分</td><td>拆分地址（如 <code>&#39;South-Hall&#39;</code>​ 按 <code>&#39;-&#39;</code> 拆分）：<br><code>SELECT split_part(address, &#39;-&#39;, 1) AS addr_part1 FROM COMPANY;</code></td><td>South（原 South-Hall）</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>​<code>strpos(x, sub)</code></td><td>查找子串在 x 中的位置（1 开始，无则 0）</td><td>查找姓名中是否包含 <code>&#39;a&#39;</code>：<br><code>SELECT name, strpos(name, &#39;a&#39;) AS a_pos FROM COMPANY;</code></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table><h5 id="四、类型转换函数-跨类型处理核心" tabindex="-1">四、类型转换函数（跨类型处理核心） <a class="header-anchor" href="#四、类型转换函数-跨类型处理核心" aria-label="Permalink to &quot;四、类型转换函数（跨类型处理核心）&quot;">​</a></h5><p>类型转换函数用于解决 “字符串转日期、日期转字符串、字符串转数字” 等跨类型需求，避免因类型不匹配导致的查询 / 插入错误，核心是 <code>to_*</code> 系列函数。</p><table tabindex="0"><thead><tr><th>函数</th><th>核心用途</th><th>示例（基于业务场景）</th><th>结果（示例）</th></tr></thead><tbody><tr><td>​<code>to_char(x, format)</code></td><td>将 “时间 / 数字” 转为字符串（最常用）</td><td>1. 时间戳转 “YYYY-MM-DD” 格式（如 <code>join_date</code> 是 timestamp）：<br><code>SELECT to_char(join_date, &#39;YYYY-MM-DD&#39;) AS join_day FROM COMPANY;</code><br>2. 工资转 “千位分隔符” 格式：<br><code>SELECT to_char(salary, &#39;FM999,999&#39;) AS sal_format FROM COMPANY;</code></td><td>1. 2023-01-15（假设 join_date）<br>2. 85,000（David 工资）</td></tr><tr><td>​<code>to_date(x, format)</code></td><td>将字符串转为日期</td><td>解析用户输入的日期字符串（如 <code>&#39;15-01-2023&#39;</code> 转 date）：<br><code>INSERT INTO COMPANY (name, join_date) VALUES (&#39;Lisa&#39;, to_date(&#39;15-01-2023&#39;, &#39;DD-MM-YYYY&#39;));</code></td><td>2023-01-15（date 类型）</td></tr><tr><td>​<code>to_number(x, format)</code></td><td>将字符串转为数字</td><td>解析带千位分隔符的工资字符串（如 <code>&#39;85,000&#39;</code> 转数值）：<br><code>UPDATE COMPANY SET salary = to_number(&#39;85,000&#39;, &#39;999,999&#39;) WHERE name = &#39;David&#39;;</code></td><td>85000（numeric 类型）</td></tr><tr><td>​<code>to_timestamp(x, format)</code></td><td>将字符串转为时间戳</td><td>解析带时间的字符串（如 <code>&#39;2023-01-15 09:30&#39;</code> 转 timestamp）：<br><code>SELECT to_timestamp(&#39;2023-01-15 09:30&#39;, &#39;YYYY-MM-DD HH24:MI&#39;) AS create_time;</code></td><td></td></tr></tbody></table><h5 id="总结-高频组合场景" tabindex="-1">总结：高频组合场景 <a class="header-anchor" href="#总结-高频组合场景" aria-label="Permalink to &quot;总结：高频组合场景&quot;">​</a></h5><ol><li>​<strong>数据统计</strong>​：聚合函数（<code>COUNT</code>​/<code>SUM</code>​/<code>AVG</code>​） + <code>GROUP BY</code>​ + 类型转换（<code>to_char</code> 格式化日期）；</li><li>​<strong>数据清洗</strong>​：字符串函数（<code>trim</code>​ 去空格、<code>replace</code>​ 改内容、<code>lower</code> 统一大小写）；</li><li>​<strong>数值调整</strong>​：数学函数（<code>round</code>​ 四舍五入、<code>mod</code>​ 判断奇偶、<code>abs</code> 算差值）；</li><li>​<strong>格式统一</strong>​：类型转换（<code>to_date</code>​ 统一日期格式、<code>to_number</code> 解析字符串数字）。</li></ol>',11)])])}const u=p(d,[["render",i]]);export{T as __pageData,u as default};
