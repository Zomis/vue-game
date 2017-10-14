#!/usr/bin/env groovy

@Library('ZomisJenkins')
import net.zomis.jenkins.Duga

node {
  def duga = new Duga()

  stage("Prepare") {
    sh 'rm -rf dist/ vue-game/'
    checkout scm
    sh 'yarn install'
  }
  stage("Build") {
    sh 'yarn build'
  }
  stage("Deploy") {
    withCredentials([usernamePassword(credentialsId: '9dee6495-02c0-43e2-82b5-314bfffc3793', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
      sh 'mv dist vue-game'
      sh 'ncftpput -R -v -u $USERNAME -p $PASSWORD www.zomis.net public_html/codereview vue-game'
    }
  }
  stage("Report") {
    duga.dugaResult('Build complete. See result at http://www.zomis.net/codereview/vue-game')
  }
}
