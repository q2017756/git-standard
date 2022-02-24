#! /usr/bin/env node 
import { Command } from 'commander/esm.mjs';
const program = new Command();

import inquirer from "inquirer"
import _ from "lodash"
import chalk from "chalk"
import shell from 'shelljs'

program
    .command('branch')
    .alias('b')
    .description('创建新的分支')
    .action(async () => {
        var promps = []
        
        console.log('')  
        console.log(chalk.red('开启 git规范 之路'));
        console.log('')        

        const answer = await inquirer.prompt([
          {
            type: 'list',
            name: 'name',
            message: '请选择操作类型',
            choices: [
              { name: '创建分支', value: 'branch' },
              { name: '提交代码', value: 'commit' }, 
            ]
          }
        ]);
        if (answer.name === 'branch') {
          const answerBranch = await inquirer.prompt([
            {
              type: 'list',
              name: 'dirName',
              message: '请选择项目/文件夹名称',
              choices: [
                { name: 'vue-proj1', value: 'proj1' },
                { name: 'test-proj2', value: 'proj2' }
              ]
            },
            {
              type: 'input',
              name: 'date',
              message: '请输入发版日期',
              validate: function (input){
                  if(!input) {
                      return '不能为空'
                  }
                  return true
              }
            }
          ]);
          const branchName = `${answerBranch.dirName}-${answerBranch.date}`
          shell.exec(`git checkout -b ${branchName}`)
          shell.exec(`git push origin ${branchName}`)
          return
        }
        if (answer.name === 'commit') {
          const answerCommit = await inquirer.prompt([
            {
              type: 'list',
              name: 'changeType',
              message: '请选择提交类型',
              choices: [
                { name: 'fix：修改', value: 'fix' },
                { name: 'feat：新功能', value: 'feat' }
              ]
            },
            {
              type: 'list',
              name: 'dirName',
              message: '请选择项目/文件夹名称',
              choices: [
                { name: 'vue-proj1', value: 'proj1' },
                { name: 'test-proj2', value: 'proj2' }
              ]
            },
            {
              type: 'input',
              name: 'commitMessage',
              message: '请输入描述',
              validate: function (input){
                  if(!input) {
                      return '不能为空'
                  }
                  return true
              }
            }
          ]);
          shell.exec(`git commit -m '${answerCommit.changeType}(${answerCommit.dirName}): ${answerCommit.commitMessage}'`)
          return
        }
        
    })

program.parse(process.argv)