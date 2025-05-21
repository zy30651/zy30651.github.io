import{_ as n,c as a,o as p,ag as e}from"./chunks/framework.BmLMQRXF.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"DevOps/docs/Jenkinsfile.md","filePath":"DevOps/docs/Jenkinsfile.md"}'),l={name:"DevOps/docs/Jenkinsfile.md"};function i(c,s,t,o,d,u){return p(),a("div",null,s[0]||(s[0]=[e(`<div class="language-jenkinsFile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jenkinsFile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pipeline {</span></span>
<span class="line"><span>    agent {</span></span>
<span class="line"><span>        kubernetes {</span></span>
<span class="line"><span>            label &#39;maven&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    parameters {</span></span>
<span class="line"><span>        gitParameter name: &#39;BRANCH_NAME&#39;,branch:&#39;&#39;,branchFilter:&#39;.*&#39;, defaultValue: &#39;master&#39;, description: &#39;请选择要发布的分支&#39;, quickFilterEnabled: true, selectedValue: &#39;DEFAULT&#39;, sortMode: &#39;ASCENDING_SMART&#39;, tagFilter: &#39;&#39;, type: &#39;PT_BRANCH_TAG&#39;, useRepository: &#39;&#39;</span></span>
<span class="line"><span>        choice(name: &#39;NAMESPACE&#39;, choices: [&#39;devops-dev&#39;, &#39;devops-test&#39;, &#39;devops-prod&#39;], description: &#39;命名空间&#39;)</span></span>
<span class="line"><span>        string(name: &#39;TAG_NAME&#39;, defaultValue: &#39;snapshot&#39;, description: &#39;标签名称, 必须以v开头,例如v0,v1.0.0&#39;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    environment {</span></span>
<span class="line"><span>        DOCKER_CREDENTIALS_ID = credentials(&#39;harbor-user-pass&#39;)</span></span>
<span class="line"><span>        REGISTRY = &#39;192.168.31.203:8858&#39;</span></span>
<span class="line"><span>        DOCKERHUB_NAMESPACE = &#39;wolfcode&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        GIT_REPO_URL = &#39;192.168.31.200:28080&#39;</span></span>
<span class="line"><span>        GIT_CREDENTIALS_ID = &#39;git-user-pass&#39;</span></span>
<span class="line"><span>        GIT_ACCOUNT = &#39;root&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        KUBE_CONFIG_CREDENTIALS_ID = &#39;sss&#39;</span></span>
<span class="line"><span>        APP_NAME = &#39;k8s-cicd-demo&#39;</span></span>
<span class="line"><span>        SONAR_SERVER_URL = &#39;http://192.168.31.200.31377&#39;</span></span>
<span class="line"><span>        SONAR_CREDENTIALS_ID = &#39;sonar-token&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    stage{</span></span>
<span class="line"><span>        stage(&#39;Unit &amp; Test&#39;) {</span></span>
<span class="line"><span>        steps {</span></span>
<span class="line"><span>            sh &#39;mvn clean test&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // stage(&#39;SonarQube Analysis&#39;) {</span></span>
<span class="line"><span>    //     steps {</span></span>
<span class="line"><span>    //         withCredentials([string(credentialsId: &quot;\${SONAR_CREDENTIAL_ID}&quot;, variable: &#39;SONAR_TOKEN&#39;)]) {</span></span>
<span class="line"><span>    //             withSonarQubeEnv(&#39;sonarqube&#39;) {</span></span>
<span class="line"><span>    //                 sh &quot;mvn sonar:sonar -Dsonar.projectKey=\${APP_NAME}&quot;</span></span>
<span class="line"><span>    //             }</span></span>
<span class="line"><span>    //         }</span></span>
<span class="line"><span>    //         timeout(time: 10, unit: &#39;HOURS&#39;) {</span></span>
<span class="line"><span>    //             waitForQualityGate abortPipeline: true</span></span>
<span class="line"><span>    //         }</span></span>
<span class="line"><span>    //     }</span></span>
<span class="line"><span>    // }</span></span>
<span class="line"><span>    stage(&#39;Build &amp; Push&#39;) {</span></span>
<span class="line"><span>        steps {</span></span>
<span class="line"><span>            sh &#39;mvn clean package -DskipTests&#39;</span></span>
<span class="line"><span>            script {</span></span>
<span class="line"><span>                dockerImage = docker.build(</span></span>
<span class="line"><span>                    &quot;\${REGISTRY}/\${DOCKER_NAMESPACE}/\${APP_NAME}:SNAPSHOT-\${BUILD_NUMBER}&quot;,</span></span>
<span class="line"><span>                    &quot;-f Dockerfile .&quot;</span></span>
<span class="line"><span>                )</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            withCredentials([usernamePassword(</span></span>
<span class="line"><span>                credentialsId: &quot;\${DOCKER_CREDENTIAL_ID}&quot;,</span></span>
<span class="line"><span>                passwordVariable: &#39;DOCKER_PASSWORD&#39;,</span></span>
<span class="line"><span>                usernameVariable: &#39;DOCKER_USERNAME&#39;</span></span>
<span class="line"><span>            )]) {</span></span>
<span class="line"><span>                sh &quot;echo \${DOCKER_PASSWORD} | docker login \${REGISTRY} -u \${DOCKER_USERNAME} --password-stdin&quot;</span></span>
<span class="line"><span>                dockerImage.push()</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    stage(&#39;Push latest&#39;) {</span></span>
<span class="line"><span>        when {</span></span>
<span class="line"><span>            branch &#39;master&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        steps {</span></span>
<span class="line"><span>            script {</span></span>
<span class="line"><span>                dockerImageLatest = docker.image(&quot;\${REGISTRY}/\${DOCKER_NAMESPACE}/\${APP_NAME}:SNAPSHOT-\${BUILD_NUMBER}&quot;)</span></span>
<span class="line"><span>                dockerImageLatest.push(&#39;latest&#39;)</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    stage(&#39;Deploy to dev&#39;) {</span></span>
<span class="line"><span>        when {</span></span>
<span class="line"><span>            branch &#39;master&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        steps {</span></span>
<span class="line"><span>            input(id: &#39;deploy-dev&#39;, message: &quot;是否部署到开发环境？&quot;)</span></span>
<span class="line"><span>            sh &quot;&quot;&quot;</span></span>
<span class="line"><span>                sed -i &quot;s#REGISTRY#\${REGISTRY}#g&quot; deploy/cicd-demo-dev.yaml</span></span>
<span class="line"><span>                sed -i &quot;s#DOCKER_NAMESPACE#\${DOCKER_NAMESPACE}#g&quot; deploy/cicd-demo-dev.yaml</span></span>
<span class="line"><span>                sed -i &quot;s#APP_NAME#\${APP_NAME}#g&quot; deploy/cicd-demo-dev.yaml</span></span>
<span class="line"><span>                sed -i &quot;s#BUILD_NUMBER#\${BUILD_NUMBER}#g&quot; deploy/cicd-demo-dev.yaml</span></span>
<span class="line"><span>                kubectl apply -f deploy/cicd-demo-dev.yaml</span></span>
<span class="line"><span>            &quot;&quot;&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    stage(&#39;Push with tag&#39;) {</span></span>
<span class="line"><span>        when {</span></span>
<span class="line"><span>            expression {</span></span>
<span class="line"><span>                return params.TAG_NAME ==~ /v.*/</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        steps {</span></span>
<span class="line"><span>            input(id: &#39;release-image-with-tag&#39;, message: &#39;release image with tag?&#39;)</span></span>
<span class="line"><span>            script {</span></span>
<span class="line"><span>                dockerImageTag = docker.image(&quot;\${REGISTRY}/\${DOCKER_NAMESPACE}/\${APP_NAME}:SNAPSHOT-\${BUILD_NUMBER}&quot;)</span></span>
<span class="line"><span>                dockerImageTag.push(&quot;\${TAG_NAME}&quot;)</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            withCredentials([usernamePassword(</span></span>
<span class="line"><span>                credentialsId: &quot;\${GIT_CREDENTIAL_ID}&quot;,</span></span>
<span class="line"><span>                passwordVariable: &#39;GIT_PASSWORD&#39;,</span></span>
<span class="line"><span>                usernameVariable: &#39;GIT_USERNAME&#39;</span></span>
<span class="line"><span>            )]) {</span></span>
<span class="line"><span>                sh &#39;git config --global user.email &quot;liugang@wolfcode.cn&quot;&#39;</span></span>
<span class="line"><span>                sh &#39;git config --global user.name &quot;xiaoliu&quot;&#39;</span></span>
<span class="line"><span>                sh &quot;git tag -a \${TAG_NAME} -m \\&quot;\${TAG_NAME}\\&quot;&quot;</span></span>
<span class="line"><span>                sh &quot;git push http://\${GIT_USERNAME}:\${GIT_PASSWORD}@\${GIT_REPO_URL} --tags&quot;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    stage(&#39;Deploy to production&#39;) {</span></span>
<span class="line"><span>        when {</span></span>
<span class="line"><span>            expression {</span></span>
<span class="line"><span>                return params.TAG_NAME ==~ /v.*/</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        steps {</span></span>
<span class="line"><span>            input(id: &#39;deploy-to-production&#39;, message: &#39;deploy to production?&#39;)</span></span>
<span class="line"><span>            sh &quot;&quot;&quot;</span></span>
<span class="line"><span>                sed -i &quot;s#REGISTRY#\${REGISTRY}#g&quot; deploy/cicd-demo.yaml</span></span>
<span class="line"><span>                sed -i &quot;s#DOCKER_NAMESPACE#\${DOCKER_NAMESPACE}#g&quot; deploy/cicd-demo.yaml</span></span>
<span class="line"><span>                sed -i &quot;s#APP_NAME#\${APP_NAME}#g&quot; deploy/cicd-demo.yaml</span></span>
<span class="line"><span>                sed -i &quot;s#TAG_NAME#\${TAG_NAME}#g&quot; deploy/cicd-demo.yaml</span></span>
<span class="line"><span>                kubectl apply -f deploy/cicd-demo.yaml -n \${NAMESPACE}</span></span>
<span class="line"><span>            &quot;&quot;&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,1)]))}const A=n(l,[["render",i]]);export{E as __pageData,A as default};
